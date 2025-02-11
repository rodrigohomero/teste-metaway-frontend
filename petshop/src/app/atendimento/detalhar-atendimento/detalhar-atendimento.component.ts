import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider'
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe, Location } from '@angular/common';
import { Cliente } from '../../model/cliente.model';
import { PetService } from '../../service/pet.service';
import { Pet } from '../../model/pet.model';
import { UsuarioService } from '../../service/usuario.service';
import { AdicionarPetDialogComponent } from '../../dialogs/adicionar-pet-dialog/adicionar-pet-dialog.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ALterarPetDialogComponent } from '../../dialogs/alterar-pet-dialog/alterar-pet-dialog.component';
import { AtendimentoService } from '../../service/atendimento.service';
import { Atendimento } from '../../model/atendimento.model';



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
  templateUrl: './detalhar-atendimento.component.html',
  styleUrl: './detalhar-atendimento.component.scss'
})
export class DetalharAtendimentoComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private atendimentoService: AtendimentoService,
    private location: Location,
    public usuarioService: UsuarioService,
    public datePipe: DatePipe

  ) {
  }


  ngOnInit(): void {



    this.route.params.subscribe(
      params => {

        const idAtendimentoParam = params['idAtendimento'];

      

          this.idAtendimento = idAtendimentoParam


        this.pesquisarPorId(this.idAtendimento);

      }

    );



  }


  getNav: any;

  atendimento: Atendimento = new Atendimento

  idAtendimento: number = 0



  onCancel() {
    this.location.back();
  }


  async pesquisarPorId(id: number) {

    await this.atendimentoService.getAtendimentoById(id).subscribe(
      dados => {
        this.atendimento = dados

      }
    );
  }



}
