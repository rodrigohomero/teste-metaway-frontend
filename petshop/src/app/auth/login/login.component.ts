import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { IUsuario } from '../../model/IUsuario.model';
import { UsuarioService } from '../../service/usuario.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatCardModule,
    MatOptionModule,
    FormsModule,
    MatMenuModule

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


  constructor(private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute

  ) {



}


  form = this.fb.group({
    cpf: [{ value: '', disabled: false },
    [ Validators.required]

    ],
    senha: ['', [Validators.required, Validators.minLength(2)]]
  });

  onSubmit() {

    if (this.form.invalid) return;

    var usuario = this.form.getRawValue() as IUsuario;

    this.usuarioService.logar(usuario).subscribe((response) => {


      this.snackBar.open('Autenticado com sucesso!', 'Seja bem vindo(a)', {
        duration: 3000
      });

    },
      (error) => {

        if (error.status == 401 || error.status == 403) {

          this.snackBar.open('Falha na autenticação', 'Usuário ou senha inválidos!', {
            duration: 3000
          });

        } else {

          this.snackBar.open('Falha na comunicação', 'Não foi possível se conectar ao servidor.', {
            duration: 3000
          });

        }

      }

    )


  }




}
