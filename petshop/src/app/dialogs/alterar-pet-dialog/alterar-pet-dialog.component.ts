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
import { Pet } from '../../model/pet.model';


@Component({
  selector: 'app-alterar-pet-dialog',
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
    MatOptionModule
  ],
  templateUrl: './alterar-pet-dialog.component.html',
  styleUrl: './alterar-pet-dialog.component.css'
})
export class ALterarPetDialogComponent implements OnInit{

  petForm: FormGroup;

  pet: Pet = new Pet

  // Aqui podemos emular a lista de raçar que viriam do banco de dados.
  racas = [
    'Labrador', 'Husk Siberiano', 'SRD', 'Golden Retriever', 'Pit Bull', 'Maltês', 'Doberman', 'Rotwailler', 'Dog Alemão', 'Pastor Alemão', 'Pintcher',
  ];


  ngOnInit(): void {
  
  
  }

  constructor(

    public dialogRef: MatDialogRef<ALterarPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { pet: Pet},
    private fb: FormBuilder
  ) {
    this.petForm = this.fb.group({
      nome: ['', [Validators.required, Validators.email]],
      dataNascimento: [null, [Validators.required, Validators.min(1), Validators.max(100)]],

      raca: this.fb.group({
        descricao: [null, [Validators.required, Validators.min(1)]]
      })
    });
  }

  alterarPet() {

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
