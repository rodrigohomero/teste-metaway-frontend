import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ValidateCpf } from '../../validators/validators';
import { CommonModule, Location } from '@angular/common';
import { AdicionarPetDialogComponent } from '../../dialogs/adicionar-pet-dialog/adicionar-pet-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-alterar-cliente',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatToolbarModule,
    MatDatepickerModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    CommonModule
  ],
  templateUrl: './alterar-cliente.component.html',
  styleUrl: './alterar-cliente.component.scss'
})
export class AlterarClienteComponent implements OnInit {


  constructor(
    private location: Location,
    private clienteService: ClienteService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private dialog: MatDialog
   

  ) {

  }

  ngOnInit(): void {

    this.createForm();

       this.route.params.subscribe(
   
         params => {
           const idCliente = params['idCliente'];
           this.clienteService.getClienteById(idCliente).subscribe(

            dados => {
      
              this.cliente = dados;
      
              this.formCliente.patchValue({
                contato: {
                  tipo: this.cliente.contato.tipo,
                  valor: this.cliente.contato.valor,
                  tag: this.cliente.contato.tag
                },
                endereco: {
                  logradouro: this.cliente.endereco.logradouro,
                  cidade: this.cliente.endereco.cidade,
                  bairro: this.cliente.endereco.bairro,
                  complemento: this.cliente.endereco.complemento,
                  tag: this.cliente.endereco.tag
                }
              });
            }
          );
         }
       );

    


  }

  loadingMessage = "Salvando as informações";
  loadingMessages = [
    "Salvando informações"
  ];

  isLoading = false;

  cliente: Cliente = new Cliente

  formCliente!: FormGroup;



  onSubmit() {

    this.isLoading = true;

    let dadoscliente: Cliente = this.formCliente.getRawValue() as Cliente;

    dadoscliente = this.setarValores(dadoscliente);

    this.clienteService.updateCliente(this.cliente.id!, dadoscliente ).subscribe(

      dados => {

        this.snackBar.open('cliente salvo com sucesso!', '', { duration: 3000 });
        this.isLoading = false;
   
      },
      error => {

        this.snackBar.open('Erro ao salvar cliente', '', { duration: 3000 });
        this.isLoading = false;
      },
    );

    //this.voltar();
  }


  createForm() {

    this.formCliente = this.fb.group({

      nome: [this.cliente.nome,
      [Validators.required, Validators.minLength(10)]],

      cpf: [this.cliente.cpf,
      [Validators.required, Validators.minLength(11), Validators.maxLength(11), ValidateCpf]],

      contato: this.fb.group({

        tag: [this.cliente.contato.tag,
          [Validators.required, Validators.maxLength(2)]],

        tipo: [this.cliente.contato.tipo,
        [Validators.required, Validators.maxLength(2)]],

        valor: [this.cliente.contato.valor,
        [Validators.required]],

      }),

      usuario: this.fb.group({

        senha: ['',
          [Validators.required]],

        confirmaSenha: ['',
          [Validators.required]]
      }),

      endereco: this.fb.group({

        logradouro: [this.cliente.endereco.logradouro,
          [Validators.required]],

        cidade: [this.cliente.endereco.cidade,
        [Validators.required]],

        bairro: [this.cliente.endereco.bairro,
        [Validators.required]],

        complemento: [this.cliente.endereco.complemento],

        tag: [this.cliente.endereco.tag,
        [Validators.required]],

      }),

    })

  }


  setarValores(clienteUpdate: Cliente) {

    clienteUpdate.id = this.cliente.id;
    clienteUpdate.dataCadastro = this.cliente.dataCadastro
    clienteUpdate.usuario = this.cliente.usuario


    return clienteUpdate;
  }

  voltar() {
    this.location.back();
  }


  somenteNumeros(event: any) {
    const pattern = /[0-9]/;
    let inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      // Caractere inválido, impedir a entrada
      event.preventDefault();
    }

  }

  adicionarPet(){
  
    // Abre a modal e passa o idInstituicao como dado
    const dialogRef = this.dialog.open(AdicionarPetDialogComponent, {
      width: '400px',
    });
  
    // Após o fechamento do modal, recarregar as propostas pendentes
    dialogRef.afterClosed().subscribe(
      pet=>{
        this.cliente.pets.push = pet
      });
  }


}
