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


@Component({
  selector: 'app-convidar-influencer-dialog',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './adicionar-pet-dialog.component.html',
  styleUrl: './adicionar-pet-dialog.component.css'
})
export class AdicionarPetDialogComponent implements OnInit{

  petForm!: FormGroup;

  pet: Pet = new Pet

  // Aqui podemos emular a lista de raçar que viriam do banco de dados.
  racas: Raca[] = [];


  ngOnInit(): void {


    this.racaService.getRacas().subscribe(
      response=>{
        this.racas = response
      }
    )

    this.petForm = this.fb.group({
      nome: ['', [Validators.required]],

      dataNascimento: ['', [Validators.required]],

      raca: ['', [Validators.required]]
 
    });
  
  
  }



  constructor(

    public dialogRef: MatDialogRef<AdicionarPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Cliente},
    private fb: FormBuilder,
    private racaService: RacaService
  ) {

    
  }

  adicionarPet() {

    this.pet = this.petForm.getRawValue() as Pet
    this.dialogRef.close(this.pet);
      
  }
  

  onCancel() {
    this.dialogRef.close();
  }


  onDateBlur() {
    const control = this.petForm.get('dataNascimento');
    const valor = control?.value;

    if (!valor) {
      control?.setErrors({ invalidDate: true });
      return;
    }

    // Verificar se o valor é uma string no formato dd/MM/yyyy
    if (typeof valor === 'string') {
      const partes = valor.split('/');
      if (partes.length === 3) {
        const dia = parseInt(partes[0], 10);
        const mes = parseInt(partes[1], 10) - 1; // Meses começam do índice 0
        const ano = parseInt(partes[2], 10);

        const data = new Date(ano, mes, dia);

        // Validar a data gerada
        if (
          data.getDate() === dia &&
          data.getMonth() === mes &&
          data.getFullYear() === ano
        ) {
          control.setValue(data); // Substituir pelo objeto Date
          control.setErrors(null);
          return;
        }
      }
      control.setErrors({ invalidDate: true });
    }
  }


}
