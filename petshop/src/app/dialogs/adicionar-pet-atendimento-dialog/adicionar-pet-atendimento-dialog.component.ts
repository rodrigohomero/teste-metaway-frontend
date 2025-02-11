import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Cliente } from '../../model/cliente.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { Pet, Raca } from '../../model/pet.model';
import { MatSelectModule } from '@angular/material/select';
import { RacaService } from '../../service/raca.service';
import { PetService } from '../../service/pet.service';
import { MatTableModule } from '@angular/material/table';


@Component({
  selector: 'app-adicionar-pet-atendimento-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    CommonModule,
    MatIconModule,
    MatTableModule

  ],
  templateUrl: './adicionar-pet-atendimento-dialog.component.html',
  styleUrl: './adicionar-pet-atendimento-dialog.component.css'
})
export class AdicionarPetAtendimentoDialogComponent implements OnInit {


  pets: Pet[] = []

  dataSource: any;

  displayedColumns: string[] = ['nome', 'raca', 'dataNascimento', 'actions'];


  ngOnInit(): void {


    this.pesquisarPets()


  }



  constructor(

    public dialogRef: MatDialogRef<AdicionarPetAtendimentoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente },
    private petService: PetService
  ) {


  }

  onAdicionarPet(pet: Pet) {

    this.dialogRef.close(pet);

  }


  onCancel() {
    this.dialogRef.close();
  }


  pesquisarPets() {

    this.petService.getPets().subscribe(

      response => {

        this.pets = response

        this.dataSource = this.pets

        console.log(this.pets)
      }
    )
  }


}
