import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClienteService } from '../../service/cliente.service';
import { UsuarioService } from '../../service/usuario.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, ActivatedRoute } from '@angular/router';
import { Cliente } from '../../model/cliente.model';
import { ValidateCpf } from '../../validators/validators';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarPetDialogComponent } from '../../dialogs/adicionar-pet-dialog/adicionar-pet-dialog.component';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-adicionar-cliente',
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
    MatSnackBarModule
  ],
  templateUrl: './adicionar-cliente.component.html',
  styleUrl: './adicionar-cliente.component.scss'
})
export class AdicionarClienteComponent implements OnInit {

  constructor(
    private router: Router,
    private location: Location,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    public usuarioService: UsuarioService,
    private dialog: MatDialog){

  }

  ngOnInit(): void {

    this.createForm();

  }

  loadingMessage = "Salvando as informações";
  loadingMessages = [
    "Salvando informações",
    "Configurando conta"
  ];

  isLoading = false;

  cliente: Cliente = new Cliente;

  formCliente!: FormGroup;

  tiposContato: string[] = [
    'Telefone', 'Email'
  ]

  voltar() {
    this.location.back();
  }

  onSubmit() {

    this.isLoading = true;

    let messageIndex = 0;

    // Alternar mensagens a cada 2 segundos
    const interval = setInterval(() => {
      this.loadingMessage = this.loadingMessages[messageIndex];
      messageIndex = (messageIndex + 1) % this.loadingMessages.length;
    }, 8000);

    //this.assinante.planoassinantes.push(this.planoassinante);
    let form = this.formCliente.getRawValue();

    delete form.usuario.confirmaSenha;

    this.cliente = form as Cliente;

    this.cliente.dataCadastro = new Date

    this.cliente.contato.tag = ''

    this.cliente.usuario.cpf = this.cliente.cpf

    this.cliente.usuario.nome = this.cliente.nome

    console.log(this.cliente);

    this.clienteService.addCliente(this.cliente).subscribe(

      dados => {

        this.snackBar.open('Cliente salvo com sucesso!', '', { duration: 3000 });
        this.isLoading = false;

        this.router.navigate(['admin/home/clientes']);
      
      },
      error => {

        this.snackBar.open('Erro ao salvar Cliente', '', { duration: 3000 });
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
          [Validators.required]],

        tipo: [this.cliente.contato.tipo,
        [Validators.required]],

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
        [Validators.required]]

      }),

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
