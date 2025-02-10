import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { ConfirmacaoDialogComponent } from '../confirmacao-dialog/confirmacao-dialog.component';
import { Raca } from '../../model/pet.model';

@Component({
  selector: 'app-adicionar-raca-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatDividerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './adicionar-raca-dialog.component.html',
  styleUrl: './adicionar-raca-dialog.component.scss'
})
export class AdicionarRacaDialogComponent implements OnInit {


  ngOnInit() {

    this.createForm();

  }

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }


  isLoading = false

  croppedImage: any = '';

  urlCroppedImage: any = '';

  form!: FormGroup;

  raca: Raca = new Raca;


  createForm() {

    this.form = this.fb.group({
      descricao: ['', [Validators.required]]
    });
  }


  onSalvar() {

    this.raca = this.form.getRawValue() as Raca;
    this.dialogRef.close(this.raca);

  }



  onCancel() {
    this.dialogRef.close();
  }




}
