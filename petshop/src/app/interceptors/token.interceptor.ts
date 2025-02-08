import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
//@ts-ignore
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { UsuarioService } from '../service/usuario.service';


interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {


  let token = localStorage.getItem('token');
  const usuarioService = inject(UsuarioService);
  const router = inject(Router);


  if (!token) {

    console.log("Token não encontrado!");

  } else {

    console.log("Token: " + token + " Encontrado!");

    // Decodifique o token para obter o papel do usuário
    let decodedToken = jwtDecode(token) as ExtendedJwtPayload;
    let userRole = decodedToken.roles; // Supondo que o papel do usuário esteja armazenado em uma reivindicação chamada "roles"

    // Armazene o papel do usuário no armazenamento local
    localStorage.setItem('userRole', JSON.stringify(userRole));

    console.log('INTERCEPTOR - Encotrou a Role '+ localStorage.getItem('userRole'));
    

    req = req.clone({
      setHeaders: {
        Authorization: `${token}`

      }
    });
  }
  return next(req).pipe(tap(() => { },
    (err: any) => {
      if (err instanceof HttpErrorResponse) {

        console.log("ACHOU O ERRO");

        if (err.status !== 403) {

          console.log("PRIMEIRO IF");

          return;
        }

        usuarioService.deslogar();
        console.log("CHAMOU DESLOGAR");

      }
    }))

};
