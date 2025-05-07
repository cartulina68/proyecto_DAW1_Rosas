import { Component } from '@angular/core';
import { AutorService, Autor } from '../../../services/Autor/autor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-actualizar-autor',
  templateUrl: './actualizar-autor.component.html',
  styleUrl: './actualizar-autor.component.css'
})
export class ActualizarAutorComponent {
  id: number = 0;
  autor: Autor = { nombre: '', nacionalidad: '' };

  constructor(
    private autorService: AutorService,
    private snackBar: MatSnackBar
  ) {}

  actualizarAutor() {
    if (this.id && this.autor.nombre && this.autor.nacionalidad) {
      this.autorService.actualizarAutor(this.id, this.autor).subscribe({
        next: () => {
          this.snackBar.open('✅ Autor actualizado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });
          this.id = 0;
          this.autor = { nombre: '', nacionalidad: '' };
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('⚠️ Error al actualizar el autor', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        }
      });
    }
  }
}
