import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { UsuarioService } from '../../service/usuario.service';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente.model';


@Component({
  selector: 'app-menu-cliente',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe
  
  ],
  templateUrl: './menu-cliente.component.html',
  styleUrl: './menu-cliente.component.scss'
})
export class MenuClienteComponent implements OnInit{

  private breakpointObserver = inject(BreakpointObserver);

  constructor(
    private usuarioService: UsuarioService, 
    private router: Router,
    private clienteService: ClienteService
    ) { }

  ngOnInit(): void {
    const id=  parseInt(localStorage.getItem('idCliente') || '');
    this.clienteService.getClienteById(id).subscribe(
      dados=>{
        this.cliente = dados;
        this.primeiroNome = this.cliente.nome.split(' ')[0];
      }
    );
  }

  primeiroNome: string = '';
  cliente : Cliente = new Cliente;


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout() {
    this.usuarioService.deslogar();
    this.router.navigate(['auth/login']);
  }

  navigateTo(route: string, drawer?: MatSidenav): void {
    this.router.navigateByUrl(route);
    
    // Verifica se o dispositivo é móvel antes de fechar o drawer
    this.isHandset$.pipe(first()).subscribe(isHandset => {
      if (drawer && isHandset) {
        drawer.close();
      }
    });
  }
  

}
