import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider'
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { ClienteService } from '../../service/cliente.service';
import { Cliente } from '../../model/cliente.model';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../model/pet.model';
import { UsuarioService } from '../../service/usuario.service';
import { AdicionarPetDialogComponent } from '../../dialogs/adicionar-pet-dialog/adicionar-pet-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ALterarPetDialogComponent } from '../../dialogs/alterar-pet-dialog/alterar-pet-dialog.component';



@Component({
  selector: 'app-detalhar-cliente',
  standalone: true,
  imports: [MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatTableModule,
    MatToolbarModule,
    CommonModule

  ],
  templateUrl: './detalhar-cliente.component.html',
  styleUrl: './detalhar-cliente.component.scss'
})
export class DetalharClienteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clienteService: ClienteService,
    private location: Location,
    private petService: PetService,
    public usuarioService: UsuarioService,
    private dialog: MatDialog

  ) {
  }


  ngOnInit(): void {



    this.route.params.subscribe(
      params => {

        const idClienteParam = params['idCliente'];

        //Se tiver parâmetro é o admin detalhando o cliente
        if (idClienteParam) {

          this.idCliente = idClienteParam

        } else {
          //se não tiver parâmetro é o próprio cliente detalhando seus dados
          this.idCliente = parseInt(JSON.parse(localStorage.getItem('idCliente') || ''))

        }

        this.pesquisarPorId(this.idCliente);

      }

    );



  }


  getNav: any;

  displayedColumns: string[] = ['nome', 'raca', 'dataNascimento', 'actions'];

  dataSource: any;

  cliente: Cliente = new Cliente

  pets: Pet[] = []

  idCliente: number = 0



  onCancel() {
    this.location.back();
  }


  async pesquisarPorId(id: number) {

    await this.clienteService.getClienteById(id).subscribe(
      dados => {
        this.cliente = dados

        this.pesquisarPetByIdCliente(this.cliente.id!)

      }
    );
  }


  onUpdatePet(petId: number) {

    // Abre a modal e passa o idInstituicao como dado
    const dialogRef = this.dialog.open(ALterarPetDialogComponent, {
      width: '400px',
      data: { petId: petId }
    });

    // Após o fechamento do modal, recarregar as propostas pendentes
    dialogRef.afterClosed().subscribe(

      pet => {

        if (pet) {
          this.pesquisarPetByIdCliente(this.cliente.id!)
        }



      });
  }


  onDeletePet(idPet: number) {

    this.petService.deletePet(idPet).subscribe(
      response => {
        console.log('Pet excluído com sucesso')
        this.pesquisarPetByIdCliente(this.cliente.id!);
      }
    )

  }

  onDeleteCliente() {

    this.clienteService.deleteCliente(this.idCliente).subscribe(
      response => {
        console.log('Cliente excluído com sucesso')
        this.router.navigate(['admin/home/clientes']);
      }
    )

  }

  onAddPet() {

    // Abre a modal e passa o idInstituicao como dado
    const dialogRef = this.dialog.open(AdicionarPetDialogComponent, {
      width: '400px',
    });

    // Após o fechamento do modal, recarregar as propostas pendentes
    dialogRef.afterClosed().subscribe(
      pet => {

        this.cliente.pets.push(pet)

        console.log(this.cliente)
        this.clienteService.addCliente(this.cliente).subscribe(
          response => {
            console.log('Pet Salvo!')
            this.dataSource = response.pets
          }
        )
      });
  }


  pesquisarPetByIdCliente(idCliente: number) {

    this.petService.getPetByIdCliente(idCliente).subscribe(

      response => {

        this.pets = response

        this.dataSource = this.pets

        console.log(this.pets)
      }
    )
  }


  onEditarCliente() {

    if (this.usuarioService.clienteLogado) {
      this.router.navigate(['area-cliente/home/alterar-cliente']);
    } else {
      this.router.navigate(['admin/home/alterar-cliente/' + this.cliente.id]);
    }

  }


}
