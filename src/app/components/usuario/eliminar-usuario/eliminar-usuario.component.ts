import { Component, Inject } from '@angular/core';
import { Usuario, UsuarioService } from '../../../services/Usuario/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-eliminar-usuario',
  templateUrl: './eliminar-usuario.component.html',
  styleUrls: ['./eliminar-usuario.component.css'],
  imports: [MatDialogTitle, MatDialogActions, MatButtonModule],
})
export class EliminarUsuarioComponent {
  constructor(
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public usuario: Required<Usuario>,
    private dialogRef: MatDialogRef<EliminarUsuarioComponent>,
  ) {}

  eliminarUsuario() {
    this.usuarioService.eliminarUsuario(this.usuario.id).subscribe({
      next: () => {
        this.snackBar.open('✅ Usuario eliminado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });

        this.dialogRef.close();
      },
      error: (err) => {
        console.error(err);
        this.snackBar.open('⚠️ Error al eliminar el usuario', 'Cerrar', {
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
