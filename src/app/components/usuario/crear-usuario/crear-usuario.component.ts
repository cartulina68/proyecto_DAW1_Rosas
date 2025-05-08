import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { UsuarioService } from '../../../services/Usuario/usuario.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrl: './crear-usuario.component.css',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class CrearUsuarioComponent {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<CrearUsuarioComponent>,
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: [''],
    });
  }

  get nombre() {
    return this.usuarioForm.get('nombre');
  }

  get correo() {
    return this.usuarioForm.get('correo');
  }

  get telefono() {
    return this.usuarioForm.get('telefono');
  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      const nuevoUsuario = this.usuarioForm.value;

      this.usuarioService.crearUsuario(nuevoUsuario).subscribe({
        next: () => {
          this.snackBar.open('✅ Usuario creado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });

          this.usuarioForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('⚠️ Error al crear el usuario', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        },
      });
    }
  }

  cancelar() {
    this.usuarioForm.reset();
    this.dialogRef.close();
  }
}
