import { Component } from '@angular/core';
import { AutorService } from '../../../services/Autor/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-eliminar-autor',
  templateUrl: './eliminar-autor.component.html',
  styleUrl: './eliminar-autor.component.css'
})
export class EliminarAutorComponent {
  idEliminar: number | null = null;

  constructor(
    private autorService: AutorService,
    private snackBar: MatSnackBar
  ) {}

  eliminarAutor() {
    if (this.idEliminar !== null) {
      this.autorService.eliminarAutor(this.idEliminar).subscribe({
        next: () => {
          this.snackBar.open('✅ Autor eliminado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.idEliminar = null;
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
  }
}
