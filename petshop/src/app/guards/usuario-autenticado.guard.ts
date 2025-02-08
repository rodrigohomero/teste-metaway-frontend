import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core'

export const usuarioAutenticadoGuard: CanActivateFn = (route, state) => {
  
  const token = localStorage.getItem('token');
  console.log(route);
  console.log(state);
  const router = inject(Router);
  console.log('Instituicao Guard Ativado');
  
  let userRole = localStorage.getItem('userRole') || ''; // Obtenha o role do usuário do armazenamento local

  if (userRole != '') {
    userRole = JSON.parse(userRole);
    if (token && userRole.includes('ROLE_INSTITUICAO')) {

      return true;

    } else {
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

    if (userRole.includes('ROLE_ASSINANTE')){

      return '/area-assinante/home';

    } else if (userRole.includes('ROLE_ADMIN')){

      return '/admin/home';

    } else if (userRole.includes('ROLE_INSTITUICAO')){

      return '';

    }else if (userRole.includes('ROLE_PROJETO')){

      return '/projeto/home';

    } else if (userRole.includes('ROLE_CONSULTOR')){

      return '/consultor/home';

    }else if (userRole.includes('ROLE_EMPRESA')){

      return '/area-empresa/home';

    } else if (userRole.includes('ROLE_INFLUENCER')){

      return '/area-influencer/home';

    } 
    
    else{

      return '/auth/login';
    }

  }

};
