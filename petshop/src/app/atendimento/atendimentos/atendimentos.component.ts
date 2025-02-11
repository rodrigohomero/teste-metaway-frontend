import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { AtendimentoService } from '../../service/atendimento.service';
import { Atendimento } from '../../model/atendimento.model';
import { DatePipe } from '@angular/common';


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
  templateUrl: './atendimentos.component.html',
  styleUrl: './atendimentos.component.scss'
})
export class GerenciarAtendimentosComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(
    private router: Router,
    private atendimentoService: AtendimentoService,
    public datePipe: DatePipe) {

  }

  atendimentos: Atendimento[] = [];

  dataSource: any;

  ngOnInit(): void {


    this.atendimentoService.getAtendimentos().subscribe(
      dados => {
        this.atendimentos = dados;
        this.dataSource = new MatTableDataSource<Atendimento>(this.atendimentos);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );

  }


  onDetalhar(id: number) {

    console.log(this.atendimentos)
    this.router.navigate(['admin/home/detalhar-atendimento', id]);
  }

  onEdit(id: number) {
    this.router.navigate(['admin/home/editar-atendimento', id]);
  }

  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  displayedColumns: string[] = ['nome', 'raca', 'dataAtendimento', 'actions'];

  cadastrarAtendimento() {
    
      this.router.navigate(['admin/home/adicionar-atendimento']);

  }


  onDelete(id: number) {
    
    const confirmDelete = confirm("Tem certeza que deseja excluir este atendimento?");
    
    if (confirmDelete) {
      this.atendimentoService.deleteAtendimento(id).subscribe(() => {
        // Remove o cliente da lista após exclusão bem-sucedida
        this.atendimentos = this.atendimentos.filter(atendimento => atendimento.id !== id);
        this.dataSource.data = this.atendimentos;
      }, error => {
        console.error("Erro ao deletar atendimento:", error);
        alert("Erro ao deletar atendimento. Tente novamente.");
      });
    }
  }
  


}
