import { Routes } from '@angular/router';
import { PrincipalAreaClienteComponent } from './areas/principal-area-cliente/principal-area-cliente.component';
import { PrincipalAreaAdminComponent } from './areas/principal-area-admin/principal-area-admin.component';
import { AreaAdminGuard } from './guards/area-admin-guard.guard';
import { autoLoginGuard } from './guards/auto-login.guard';
import { LoginComponent } from './auth/login/login.component';
import { AreaClienteGuard } from './guards/area-cliente-guard.guard';
import { AlterarClienteComponent } from './cliente/alterar-cliente/alterar-cliente.component';
import { DetalharClienteComponent } from './cliente/detalhar-cliente/detalhar-cliente.component';
import { GerenciarRacasComponent } from './pet/gerenciar-racas/gerenciar-racas.component';
import { GerenciarClientesComponent } from './cliente/clientes/clientes.component';
import { AdicionarClienteComponent } from './cliente/adicionar-cliente/adicionar-cliente.component';
import { GerenciarAtendimentosComponent } from './atendimento/atendimentos/atendimentos.component';
import { AdicionarAtendimentoComponent } from './atendimento/adicionar-atendimento/adicionar-atendimento.component';
import { DetalharAtendimentoComponent } from './atendimento/detalhar-atendimento/detalhar-atendimento.component';

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
            {path:'alterar-cliente/:idCliente' , component: AlterarClienteComponent},
            {path:'adicionar-cliente' , component: AdicionarClienteComponent},
            {path:'gerenciar-racas' , component: GerenciarRacasComponent},
            {path:'detalhar-cliente/:idCliente' , component: DetalharClienteComponent},
            {path:'atendimentos' , component: GerenciarAtendimentosComponent},
            {path:'adicionar-atendimento' , component: AdicionarAtendimentoComponent},
            {path:'detalhar-atendimento/:idAtendimento' , component: DetalharAtendimentoComponent},




        ], canActivate:[AreaAdminGuard]
    },
];

