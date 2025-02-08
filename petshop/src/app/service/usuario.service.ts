import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { JwtPayload, jwtDecode } from 'jwt-decode';
import { IUsuario } from '../model/IUsuario.model';
import { Usuario } from '../model/usuario.model';
import { ClienteService } from './cliente.service';


interface ExtendedJwtPayload extends JwtPayload {
  roles: string[];
}

//const apiUrlUsuario = environment.apiUrl + "Usuario";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  constructor(private httpClient: HttpClient,
    private router: Router,
    private clienteService: ClienteService,
    private ngZone: NgZone // Adicione o NgZone


  ) {

    this.loadToken();
  }


  private url = `${environment.apiUrl}/usuario`;


  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  token = '';

  async loadToken() {
    const token = await localStorage.getItem('token');
    if (token) {
      console.log('set token: ', token);
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }


  logar(usuario: IUsuario): Observable<any> {

    console.log("CHAMOU A FUNÇãO LOGIN");

    return this.httpClient.post<any>(`${environment.apiUrl}/login`, usuario, { observe: 'response' }).pipe(

      tap((resposta) => {
        console.log("OBTEVE A RESPOSTA");
        console.log(resposta)


        if (resposta == null) return;

        let token = resposta.headers.get('Authorization');
        let decodedToken;
        let userRole;

        if (token) {

          localStorage.setItem('token', token);
          //localStorage.setItem('token', btoa(JSON.stringify("TokenQueSeriaGeradoPelaAPI")));
          decodedToken = jwtDecode(token) as ExtendedJwtPayload
          userRole = decodedToken.roles;
          localStorage.setItem('userRole', JSON.stringify(userRole));

        }


        console.log("ADICIONOU O TOKEN");

        // Decodifique o token para obter o papel do usuário


        if (userRole) {

          if (userRole.includes('ROLE_CLIENTE')) {

            this.clienteService.getClienteByCpf(usuario.cpf).subscribe(
              dados => {

                localStorage.setItem('idCliente', JSON.stringify(dados.id));
                console.log('id do cliente: ' + dados.id);
                this.router.navigate(['']);

              }
            );

          } else if (userRole.includes('ROLE_ADMIN')) {

            console.log('ACHOU A ROLE ADMIN NA FUNÇÃO LOGAR');
            localStorage.setItem('cpfAdmin', usuario.cpf);
            this.router.navigate(['admin/home']);

          } else {

            console.error('ROLE DESCONHECIDA');

          }

        }



      }));
  }
  


  deslogar() {

    this.isAuthenticated.next(false);
    localStorage.clear();
    this.router.navigate(['auth/login']);

  }

  get obterUsuarioLogado(): IUsuario {
    return localStorage.getItem('usuario')
      ? JSON.parse(atob(localStorage.getItem('usuario') || ''))
      : null;
  }

  get obterTokenUsuario(): string {
    return localStorage.getItem('token')
      ? JSON.parse(atob(localStorage.getItem('token') || ''))
      : null;
  }

  get clienteLogado(): boolean {
    let token = localStorage.getItem('token');
    let decodedToken;
    let userRole;

    if (token) {
      decodedToken = jwtDecode(token) as ExtendedJwtPayload;
      userRole = decodedToken.roles;

      // Verificar se o token expirou
      if (decodedToken.exp) {
        const current_time = Date.now().valueOf() / 1000;
        if (decodedToken.exp < current_time) {
          console.log("Token expirado.");
          return false;
        }
      }

      if (userRole.includes('ROLE_CLIENTE')) {
        return true;
      }
    }
    return false;
  }



  get adminLogado(): boolean {

    let token = localStorage.getItem('token');
    let decodedToken;
    let userRole;

    if (token) {

      decodedToken = jwtDecode(token) as ExtendedJwtPayload
      userRole = decodedToken.roles;

      if (userRole && userRole.includes('ROLE_ADMIN')) {
        return true
      }

    }

    return false;

  }

  getUsuarioPorCpf(cpf: string): Observable<Usuario> {

    return this.httpClient.get<Usuario>(this.url + '/recuperar-por-cpf/' + cpf);

  }

  updateUsuario(usuario: Usuario) {

    return this.httpClient.put<Usuario>(this.url + '/' + usuario.cpf, usuario);
  }


  decodeJwtGoogle(token: string): any {
    const payload = token.split('.')[1]; // Extrai a parte do payload do JWT
    return JSON.parse(atob(payload)); // Decodifica do Base64 para JSON
  }
}