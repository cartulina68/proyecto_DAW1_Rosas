import { Component, Inject, OnInit } from '@angular/core';
import { AutorService, Autor } from '../../../services/Autor/autor.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-actualizar-autor',
  templateUrl: './actualizar-autor.component.html',
  styleUrl: './actualizar-autor.component.css',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class ActualizarAutorComponent implements OnInit {
  autorForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private autorService: AutorService,
    private dialogRef: MatDialogRef<ActualizarAutorComponent>,
    @Inject(MAT_DIALOG_DATA) public autorId: number,
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

  ngOnInit(): void {
    this.autorService.obtenerAutorPorId(this.autorId).subscribe(autor => {
      this.autorForm.patchValue(autor);
    });
  }

  guardarAutor() {
    if (this.autorForm.valid) {
      this.autorService.actualizarAutor(this.autorId, this.autorForm.value).subscribe({
        next: () => {
          this.snackBar.open('✅ Autor actualizado exitosamente', 'Cerrar', {
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
