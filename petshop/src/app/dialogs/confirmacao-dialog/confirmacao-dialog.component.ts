import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-confirmacao-dialog',
  standalone: true,
  imports: [
    MatDialogModule, 
    MatInputModule, 
    FormsModule ,
    MatButtonModule
  ],
  templateUrl: './confirmacao-dialog.component.html',
  styleUrl: './confirmacao-dialog.component.scss'
})
export class ConfirmacaoDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
    private dialog: MatDialog
  ) {}

  onNoClick(confirmacao: boolean){

    this.dialogRef.close(confirmacao);
  }

}
