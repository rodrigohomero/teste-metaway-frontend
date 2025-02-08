import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuClienteComponent } from '../../menus/menu-cliente/menu-cliente.component';

@Component({
  selector: 'app-principal-area-cliente',
  standalone: true,
  imports: [MenuClienteComponent, RouterOutlet],
  templateUrl: './principal-area-cliente.component.html',
  styleUrl: './principal-area-cliente.component.scss'
})
export class PrincipalAreaClienteComponent {

}
