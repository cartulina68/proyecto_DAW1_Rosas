import { Component, Inject } from '@angular/core';
import { Libro, LibroService } from '../../../services/Libro/libro.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-libro',
  templateUrl: './eliminar-libro.component.html',
  styleUrl: './eliminar-libro.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule],
})
export class EliminarLibroComponent {
  constructor(
    private libroService: LibroService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public libro: Required<Libro>,
    private dialogRef: MatDialogRef<EliminarLibroComponent>,
  ) {}

  eliminarLibro() {
    this.libroService.eliminarLibro(this.libro.id).subscribe({
      next: () => {
        this.snackBar.open('✅ Libro eliminado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('⚠️ Error al eliminar el libro', 'Cerrar', {
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
