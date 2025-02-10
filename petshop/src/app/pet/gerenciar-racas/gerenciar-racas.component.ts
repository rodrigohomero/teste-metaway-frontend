import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Raca } from '../../model/pet.model';
import { RacaService } from '../../service/raca.service';
import { AdicionarRacaDialogComponent } from '../../dialogs/adicionar-raca-dialog/adicionar-raca-dialog.component';

@Component({
  selector: 'app-gerenciar-racas',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule

  ],
  templateUrl: './gerenciar-racas.component.html',
  styleUrl: './gerenciar-racas.component.scss'
})
export class GerenciarRacasComponent  implements OnInit {


  constructor(
    private racaService: RacaService,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ){}

  ngOnInit(){

    this.racaService.getRacas().subscribe(

      dados=>{
        this.racas = dados
        this.dataSource = new MatTableDataSource(this.racas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.racas);
      }
    );

  }

  

  @ViewChild(MatPaginator) paginator: MatPaginator = <MatPaginator>{};

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  displayedColumns: string[] = [ 'id', 'descricao','actions'];

  dataSource: any;

  racas: Raca[] = [];


  applyFilter(event: Event) {

    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  onDelete(id: number) {
    this.racaService.deleteRaca(id).subscribe();
    this.redirectTo('admin/home/gerenciar-racas');
  }

  onEdit(raca: Raca, event: Event) {
    // Prevent the default action to stop the Enter key from adding a new line
    event.preventDefault();
  
    // Get the new value from the event target
    let newValue = (event.target as HTMLDivElement).innerText;
  
    // Update the category description
    raca.descricao = newValue;
  
    // Call your service method to update the category in the backend
    this.racaService.updateRaca(raca.id || 0, raca).subscribe(() => {
      // Handle successful update
      console.log('Raça atualizada com sucesso');
      this.redirectTo('admin/gerenciar-racas');
    }, error => {
      // Handle error
      console.error('Erro ao atualizar raça', error);
    });
  }


   //Renderiza o componente novamente para atualizar
   redirectTo(uri: string) {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
      this.router.navigate([uri]));
  }


  openDialogAddRaca(): void {

    var confirmacao;
    const dialogRef = this.dialog.open(AdicionarRacaDialogComponent, {

    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){

        this.racaService.addRaca(result).subscribe(

          result=>{
            this.snackBar.open('Raca Salva Com Sucesso!', '', { duration: 5000 });
            this.redirectTo('admin/home/gerenciar-racas');
          }
        );

      }
    }
    );
  }

}
