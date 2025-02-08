import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateFn } from '@angular/router';
import { Observable } from 'rxjs';
import { inject } from '@angular/core';

export const AreaClienteGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  console.log(route);
  console.log(state);
  console.log('GUARD AREA DO CLIENTE ATIVADO');
  console.log('token', token);

  let userRole = localStorage.getItem('userRole') || ''; // Obtenha o role do usuário do armazenamento local

  console.log(userRole);
  

  if (userRole != '') {

    console.log('ROLE NÃO ESTÁ VAZIA');
    

    userRole = JSON.parse(userRole);

    if (token && userRole.includes('ROLE_CLIENTE')) {

      console.log('EXISTE TOKEN E ROLE_CLIENTE');
      

      return true;

    } else {

      console.log('REDIRECIONA PARA A RAÍZ DA ROLE ENCONTRADA');
      
      const baseRoute = getBaseRoute(userRole);
      router.navigate([baseRoute]);
      return false;

    }
  }

  else {
    router.navigate(['/auth/login']); // Redirecionar para a página de login se o usuário não for um assinante
    return false;
  }

  function getBaseRoute(userRole: string) {

    if (userRole.includes('ROLE_CLIENTE')){

      return '/area-cliente/home';

    } else if (userRole.includes('ROLE_ADMIN')){

      return '/admin/home';

    }else{

      return '/auth/login';
    }

  }

};