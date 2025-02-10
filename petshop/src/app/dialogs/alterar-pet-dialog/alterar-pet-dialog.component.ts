import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { Pet, Raca } from '../../model/pet.model';
import { RacaService } from '../../service/raca.service';
import { AdicionarPetDialogComponent } from '../adicionar-pet-dialog/adicionar-pet-dialog.component';
import { PetService } from '../../service/pet.service';
import { ActivatedRoute } from '@angular/router';
import { UsuarioService } from '../../service/usuario.service';
import { MatSelectModule } from '@angular/material/select';


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
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './alterar-pet-dialog.component.html',
  styleUrl: './alterar-pet-dialog.component.css'
})
export class ALterarPetDialogComponent implements OnInit {

  petForm!: FormGroup;

  pet: Pet = new Pet

  // Aqui podemos emular a lista de raçar que viriam do banco de dados.
  racas: Raca[] = [];


  ngOnInit(): void {

    this.racaService.getRacas().subscribe(
      response => {
        this.racas = response
      }
    )


    this.petForm = this.fb.group({

      nome: ['', [Validators.required]],

      dataNascimento: ['', [Validators.required]],

      raca: [null, [Validators.required]]

    });


    this.pesquisarPet(this.data.petId);




  }



  constructor(

    public dialogRef: MatDialogRef<AdicionarPetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { petId: number },
    private fb: FormBuilder,
    private racaService: RacaService,
    private petService: PetService
  ) {


  }

  alterarPet() {

    let formValue = this.petForm.getRawValue() as Pet
    formValue.id = this.pet.id
    formValue.cliente = this.pet.cliente

    this.petService.updatePet(this.pet.id!, formValue).subscribe(

      response => {
        this.pet = response
        this.dialogRef.close(this.pet);
      }
    )



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


  pesquisarPet(idPet: number) {



    this.petService.getPetById(idPet).subscribe(

      dados => {

        this.pet = dados;

        console.log(this.pet)

        this.petForm.patchValue({

          nome: this.pet.nome,
          dataNascimento: this.pet.dataNascimento,
          raca: this.racas.find(r => r.id === this.pet.raca.id) || null
        });

      }
    );
  }

}
