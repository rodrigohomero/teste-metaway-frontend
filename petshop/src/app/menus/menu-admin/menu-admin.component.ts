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

@Component({
  selector: 'app-menu-admin',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe
  
  
  ],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.scss'
})
export class MenuAdminComponent implements OnInit{

  constructor(private usuarioService: UsuarioService, private router: Router) { }

  ngOnInit(): void {
    
  }


  private breakpointObserver = inject(BreakpointObserver);

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
