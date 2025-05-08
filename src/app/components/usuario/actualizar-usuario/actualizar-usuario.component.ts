import { Component, Inject, OnInit } from '@angular/core';
import { UsuarioService, Usuario } from '../../../services/Usuario/usuario.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrl: './actualizar-usuario.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class ActualizarUsuarioComponent implements OnInit {
  usuarioForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private usuarioService: UsuarioService,
    private dialogRef: MatDialogRef<ActualizarUsuarioComponent>,
    @Inject(MAT_DIALOG_DATA) public usuarioId: number,
  ) {
    this.usuarioForm = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
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

  ngOnInit(): void {
    this.usuarioService.obtenerUsuarioPorId(this.usuarioId).subscribe(usuario => {
      this.usuarioForm.patchValue(usuario);
    });
  }

  guardarUsuario() {
    if (this.usuarioForm.valid) {
      this.usuarioService.actualizarUsuario(this.usuarioId, this.usuarioForm.value).subscribe({
        next: () => {
          this.snackBar.open('✅ Usuario actualizado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });

          this.usuarioForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.log(err);
          this.snackBar.open('⚠️ Completa todos los campos obligatorios', 'Cerrar', {
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
