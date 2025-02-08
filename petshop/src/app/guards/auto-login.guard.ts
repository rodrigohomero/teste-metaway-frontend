import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {  UsuarioService } from '../service/usuario.service';

export const autoLoginGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioService);

  const router = inject(Router);

  if(usuarioService.adminLogado){

    console.log('ADMIN AUTENTICADO');
        
    router.navigateByUrl('admin/home', { replaceUrl: true });
    return false;

  } else if(usuarioService.clienteLogado){

    console.log('CLIENTE AUTENTICADO');
            
    router.navigateByUrl('area-cliente/home', { replaceUrl: true });
    return false;

  }

  return true;

};
