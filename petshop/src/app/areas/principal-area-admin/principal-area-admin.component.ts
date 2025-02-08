import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuAdminComponent } from '../../menus/menu-admin/menu-admin.component';

@Component({
  selector: 'app-principal-area-admin',
  standalone: true,
  imports: [MenuAdminComponent, RouterOutlet],
  templateUrl: './principal-area-admin.component.html',
  styleUrl: './principal-area-admin.component.scss'
})
export class PrincipalAreaAdminComponent {

}
