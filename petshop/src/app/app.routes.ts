import { Routes } from '@angular/router';
import { PrincipalAreaClienteComponent } from './areas/principal-area-cliente/principal-area-cliente.component';
import { PrincipalAreaAdminComponent } from './areas/principal-area-admin/principal-area-admin.component';
import { AreaAdminGuard } from './guards/area-admin-guard.guard';
import { autoLoginGuard } from './guards/auto-login.guard';
import { LoginComponent } from './auth/login/login.component';
import { AreaClienteGuard } from './guards/area-cliente-guard.guard';
import { AlterarClienteComponent } from './cliente/alterar-cliente/alterar-cliente.component';
import { GerenciarClientesComponent } from './cliente/clientes/clientes.component';
import { DetalharClienteComponent } from './cliente/detalhar-cliente/detalhar-cliente.component';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';

export const routes: Routes = [

    {path:'' , component: LoginComponent, canActivate: [autoLoginGuard]},
    {path:'auth/login' , component: LoginComponent, canActivate: [autoLoginGuard]},

    {path:'area-cliente/home' , component: PrincipalAreaClienteComponent,

        children: [

            {path:'' , component: DetalharClienteComponent},
            {path:'alterar-cliente' , component: AlterarClienteComponent},
   

        ], canActivate:[AreaClienteGuard]
    },

    {path:'admin/home' , component: PrincipalAreaAdminComponent,

        children: [

            {path:'' , component: GerenciarClientesComponent},
            {path:'clientes' , component: GerenciarClientesComponent},
            {path:'alterar-cliente' , component: AlterarClienteComponent},
            {path:'adicionar-cliente' , component: AdicionarClienteComponent},



        ], canActivate:[AreaAdminGuard]
    },
];

