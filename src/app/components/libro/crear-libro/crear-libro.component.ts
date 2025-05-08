import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

import { LibroService } from '../../../services/Libro/libro.service';
import { AutorService, Autor } from '../../../services/Autor/autor.service';
import { CategoriaService, Categoria } from '../../../services/Categoria/categoria.service';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  templateUrl: './crear-libro.component.html',
  styleUrl: './crear-libro.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
  ],
})
export class CrearLibroComponent {
  libroForm: FormGroup;
  autores: Autor[] = [];
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private libroService: LibroService,
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<CrearLibroComponent>,
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      isbn: ['', Validators.required],
      anioPublicacion: ['', Validators.required],
      autorId: ['', Validators.required],      // AÑADIR ESTO
      categoriaId: ['', Validators.required],   // AÑADIR ESTO
      // cualquier otro campo que uses
    });


    this.cargarAutores();
    this.cargarCategorias();
  }

  get titulo() { return this.libroForm.get('titulo'); }
  get isbn() { return this.libroForm.get('isbn'); }
  get anioPublicacion() { return this.libroForm.get('anioPublicacion'); }
  get autor_id() { return this.libroForm.get('autor_id'); }
  get categoria_id() { return this.libroForm.get('categoria_id'); }


  guardarLibro() {
    if (this.libroForm.valid) {
      const nuevoLibro = this.libroForm.value;

      this.libroService.crearLibro(nuevoLibro).subscribe({
        next: () => {
          this.snackBar.open('✅ Libro guardado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });

          this.libroForm.reset();
          this.dialogRef.close();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('⚠️ Error al guardar el libro', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  cancelar() {
    this.libroForm.reset();
    this.dialogRef.close();
  }

  private cargarAutores() {
    this.autorService.listarAutores().subscribe({
      next: (data) => this.autores = data,
      error: (err) => console.error('Error cargando autores:', err),
    });
  }

  private cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => this.categorias = data,
      error: (err) => console.error('Error cargando categorías:', err),
    });
  }
}
