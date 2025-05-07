import { Component, Inject, OnInit } from '@angular/core';
import { CategoriaService, Categoria } from '../../../services/Categoria/categoria.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';  // Asegúrate de agregar esto

@Component({
  selector: 'app-actualizar-categoria',
  templateUrl: './actualizar-categoria.component.html',
  styleUrls: ['./actualizar-categoria.component.css'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    CommonModule,  // Asegúrate de incluirlo aquí
  ],
})
export class ActualizarCategoriaComponent implements OnInit {
  categoriaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ActualizarCategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) public categoriaId: number,
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

  ngOnInit(): void {
    this.categoriaService.obtenerCategoriaPorId(this.categoriaId).subscribe(categoria => {
      this.categoriaForm.patchValue(categoria);
    });
  }

  guardarCategoria() {
    if (this.categoriaForm.valid) {
      this.categoriaService.actualizarCategoria(this.categoriaId, this.categoriaForm.value).subscribe({
        next: () => {
          this.snackBar.open('✅ Categoría actualizada exitosamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
          });

          this.categoriaForm.reset();
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
    this.categoriaForm.reset();
    this.dialogRef.close();
  }
}
