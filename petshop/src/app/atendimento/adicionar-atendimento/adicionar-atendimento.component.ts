import { CommonModule, DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AtendimentoService } from '../../service/atendimento.service';
import { UsuarioService } from '../../service/usuario.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, ActivatedRoute } from '@angular/router';
import { Atendimento } from '../../model/atendimento.model';
import { MatDialog } from '@angular/material/dialog';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Pet } from '../../model/pet.model';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { PetService } from '../../service/pet.service';
import { AdicionarPetAtendimentoDialogComponent } from '../../dialogs/adicionar-pet-atendimento-dialog/adicionar-pet-atendimento-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-atendimento-atendimento',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatToolbarModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatOptionModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatCardModule,
    MatTableModule,
    MatDatepickerModule
  ],
  templateUrl: './adicionar-atendimento.component.html',
  styleUrl: './adicionar-atendimento.component.scss'
})
export class AdicionarAtendimentoComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private atendimentoService: AtendimentoService,
    private fb: FormBuilder,
    public datePipe: DatePipe,
    public usuarioService: UsuarioService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
    ) {

  }

  ngOnInit(): void {

    this.createForm();

  }

  loadingMessage = "Salvando as informações";
  loadingMessages = [
    "Salvando informações"
  ];

  isLoading = false;


  formAtendimento!: FormGroup;

  pet?: Pet

  atendimento: Atendimento = new Atendimento



  createForm() {

    this.formAtendimento = this.fb.group({

      descricaoAtendimento: [this.atendimento.pet.nome,
      [Validators.required, Validators.minLength(10)]],

      data: [new Date,
        [Validators.required]],

      valor : [this.atendimento.valor,
        [Validators.required]],


      

    })

  }

  somenteNumeros(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Caractere inválido, impedir a entrada
      event.preventDefault();
    }
  }


  adicionarPet() {

    // Abre a modal e passa o idInstituicao como dado
    const dialogRef = this.dialog.open(AdicionarPetAtendimentoDialogComponent, {
      width: '400px',
    });

    // Após o fechamento do modal, recarregar as propostas pendentes
    dialogRef.afterClosed().subscribe(
      pet => {
        if (pet) {

          this.pet = pet

        }
      });
  }


  onSubmit(){


    this.atendimento = this.formAtendimento.getRawValue() as Atendimento

    this.atendimento.pet = this.pet!

    this.atendimentoService.addAtendimento(this.atendimento).subscribe(
      response=>{

        this.snackBar.open('Cadastrado com sucesso!', '', {
          duration: 3000
        })
      },
      error=>{
        this.snackBar.open('Erro ao Cadastrar!', error.error.error, {
          duration: 3000
        })
      }
    )

  }


  voltar(){

  }



  onDateBlur() {
    const control = this.formAtendimento.get('dataAtendimento');
    if (!control) return;

    let valor = control.value;

    if (!valor) {
      control.setErrors({ invalidDate: true });
      return;
    }

    // Converte dd/MM/yyyy para um objeto Date
    if (typeof valor === 'string' && valor.includes('/')) {
      const partes = valor.split('/');
      if (partes.length === 3) {
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1;
        const ano = parseInt(partes[2], 10);
        const data = new Date(ano, mes, dia);

        if (data.getDate() === dia && data.getMonth() === mes && data.getFullYear() === ano) {
          control.setValue(data);
          control.setErrors(null);
        } else {
          control.setErrors({ invalidDate: true });
        }
      } else {
        control.setErrors({ invalidDate: true });
      }
    }
  }






}
