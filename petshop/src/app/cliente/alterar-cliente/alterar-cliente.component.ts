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
import { Pet } from '../../model/pet.model';
import { PetService } from '../../service/pet.service';
import { UsuarioService } from '../../service/usuario.service';

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
    private dialog: MatDialog,
    private petService: PetService,
    private usuarioService: UsuarioService
   

  ) {

  }

  ngOnInit(): void {

    this.createForm();

       this.route.params.subscribe(
   
         params => {
           let idCliente = 0

           if(params['idCliente'] && this.usuarioService.adminLogado){

            idCliente = params['idCliente'];

           } else{

            idCliente = parseInt(JSON.parse(localStorage.getItem('idCliente') || ''))

           }

           this.pesquisarCliente(idCliente);

           
         }
       );

    


  }

  loadingMessage = "Salvando as informações";
  loadingMessages = [
    "Salvando informações"
  ];

  isLoading = false;

  cliente: Cliente = new Cliente

  pets: Pet[] = []

  formCliente!: FormGroup;



  onSubmit() {

    this.isLoading = true;

    let dadoscliente: Cliente = this.formCliente.getRawValue() as Cliente;

    dadoscliente = this.setarValores(dadoscliente);

    console.log(dadoscliente)

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
      [Validators.required, Validators.maxLength(50)]],

      cpf: [this.cliente.cpf,
      [Validators.required, Validators.minLength(11), Validators.maxLength(11), ValidateCpf]],

      contato: this.fb.group({

        tag: [this.cliente.contato.tag,
          [Validators.required]],

        tipo: [this.cliente.contato.tipo,
        [Validators.required]],

        valor: [this.cliente.contato.valor,
        [Validators.required]],

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
    clienteUpdate.contato.id = this.cliente.contato.id
    clienteUpdate.endereco.id = this.cliente.endereco.id

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


  pesquisarCliente(idCliente: number){


    this.clienteService.getClienteById(idCliente).subscribe(

      dados => {

        this.petService.getPetByIdCliente(idCliente).subscribe(
          response=>{
            this.pets = response
          }
        )
        

        this.cliente = dados;

        this.formCliente.patchValue({

          nome: this.cliente.nome,
          cpf: this.cliente.cpf,

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


}
