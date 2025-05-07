import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AutorService } from '../../../services/Autor/autor.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html',
  styleUrl: './crear-autor.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class CrearAutorComponent {
  autorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private autorService: AutorService,
    private dialogRef: MatDialogRef<CrearAutorComponent>,
  ) {
    this.autorForm = this.fb.group({
      nombre: ['', Validators.required],
      nacionalidad: ['', Validators.required],
    });
  }

  get nombre() {
    return this.autorForm.get('nombre');
  }

  get nacionalidad() {
    return this.autorForm.get('nacionalidad');
  }

  guardarAutor() {
    if (this.autorForm.valid) {
      const nuevoAutor = this.autorForm.value;

      this.autorService.crearAutor(nuevoAutor).subscribe({
        next: () => {
          this.snackBar.open('✅ Autor guardado exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });

          this.autorForm.reset();
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
    this.autorForm.reset();
    this.dialogRef.close();
  }
}
