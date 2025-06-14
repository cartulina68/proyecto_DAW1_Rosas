import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoriaService } from '../../../services/Categoria/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html',
  styleUrl: './crear-categoria.component.css',
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
export class CrearCategoriaComponent {
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<CrearCategoriaComponent>,
  ) {
    this.categoriaForm = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  get nombre() {
    return this.categoriaForm.get('nombre');
  }

  get descripcion() {
    return this.categoriaForm.get('descripcion');
  }

  guardarCategoria() {
    if (this.categoriaForm.valid) {
      const nuevaCategoria = this.categoriaForm.value;

      this.categoriaService.crearCategoria(nuevaCategoria).subscribe({
        next: () => {
          this.snackBar.open('✅ Categoría guardada exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });

          this.categoriaForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('⚠️ Ocurrió un error al guardar', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
          });
        },
      });
    }
  }

  cancelar() {
    this.categoriaForm.reset();
    this.dialogRef.close();
  }
}
