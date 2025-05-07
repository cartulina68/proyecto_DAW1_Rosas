import { Component, Inject } from '@angular/core';
import { Autor, AutorService } from '../../../services/Autor/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eliminar-autor',
  templateUrl: './eliminar-autor.component.html',
  styleUrl: './eliminar-autor.component.css',
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule],
})
export class EliminarAutorComponent {
  constructor(
    private autorService: AutorService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public autor: Required<Autor>,
    private dialogRef: MatDialogRef<EliminarAutorComponent>,
  ) {}

  eliminarAutor() {
    this.autorService.eliminarAutor(this.autor.id).subscribe({
      next: () => {
        this.snackBar.open('✅ Autor eliminado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('⚠️ Error al eliminar el autor', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
  }
}
