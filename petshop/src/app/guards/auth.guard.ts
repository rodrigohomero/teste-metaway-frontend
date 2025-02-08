
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';
import { UsuarioService } from '../service/usuario.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {

  constructor(private usuarioService: UsuarioService, private router: Router) { }
 
  canLoad(): Observable<boolean> {
    
    return this.usuarioService.isAuthenticated.pipe(
      filter(val => val !== null), // Filter out initial Behaviour subject value
      take(1), // Otherwise the Observable doesn't complete!
      map(isAuthenticated => {
        if (isAuthenticated) {          
          return true;
        } else {          
          this.router.navigateByUrl('auth/login')
          return false;
        }
      })
    );
  }
}
