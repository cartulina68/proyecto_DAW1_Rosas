import { Component, Inject } from '@angular/core';
import { Categoria, CategoriaService } from '../../../services/Categoria/categoria.service'; // Asumí que tienes un servicio de Categorias
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.css'],
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule],
})
export class EliminarCategoriaComponent {
  constructor(
    private categoriaService: CategoriaService,  // Usamos el servicio de Categorias
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public categoria: Required<Categoria>,  // Se pasa la categoría a eliminar
    private dialogRef: MatDialogRef<EliminarCategoriaComponent>,
  ) {}

  eliminarCategoria() {
    this.categoriaService.eliminarCategoria(this.categoria.id).subscribe({
      next: () => {
        this.snackBar.open('✅ Categoría eliminada correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('⚠️ Error al eliminar la categoría', 'Cerrar', {
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
