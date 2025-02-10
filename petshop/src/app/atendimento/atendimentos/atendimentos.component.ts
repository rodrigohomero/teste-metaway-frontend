import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente.model';


@Component({
  selector: 'app-assinantes',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule
  ],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss'
})
export class GerenciarClientesComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private router: Router,
    private clienteService: ClienteService,
    private dialog: MatDialog) {

  }

  clientes: Cliente[] = [];

  dataSource: any;

  ngOnInit(): void {


    this.clienteService.getClientes().subscribe(
      dados => {
        this.clientes = dados;
        this.dataSource = new MatTableDataSource<Cliente>(this.clientes);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

  }


  onDetalhar(id: number) {

    console.log(this.clientes)
    this.router.navigate(['admin/home/detalhar-cliente', id]);
  }

  onEdit(id: number) {
    this.router.navigate(['cliente/editar-cliente', id]);
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  displayedColumns: string[] = ['nome', 'cpf', 'email', 'actions'];

  cadastrarCliente() {
    
      this.router.navigate(['admin/home/adicionar-cliente']);

  }


  onDelete(id: number) {
    
    const confirmDelete = confirm("Tem certeza que deseja excluir este cliente?");
    
    if (confirmDelete) {
      this.clienteService.deleteCliente(id).subscribe(() => {
        // Remove o cliente da lista após exclusão bem-sucedida
        this.clientes = this.clientes.filter(cliente => cliente.id !== id);
        this.dataSource.data = this.clientes;
      }, error => {
        console.error("Erro ao deletar cliente:", error);
        alert("Erro ao deletar cliente. Tente novamente.");
      });
    }
  }
  


}
