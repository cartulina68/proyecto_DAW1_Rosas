import { Component, Inject } from '@angular/core';
import { Prestamo, PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogActions, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-eliminar-prestamo',
  templateUrl: './eliminar-prestamo.component.html',
  styleUrl: './eliminar-prestamo.component.css',
  standalone: true,
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule],
})
export class EliminarPrestamoComponent {
  constructor(
    private prestamoService: PrestamoService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public prestamo: Required<Prestamo>,
    private dialogRef: MatDialogRef<EliminarPrestamoComponent>,
  ) {}

  eliminarPrestamo() {
    this.prestamoService.eliminarPrestamo(this.prestamo.id).subscribe({
      next: () => {
        this.snackBar.open('✅ Préstamo eliminado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('⚠️ Error al eliminar el préstamo', 'Cerrar', {
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
