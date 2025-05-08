import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LibroService, Libro } from '../../../services/Libro/libro.service';
import { AutorService, Autor } from '../../../services/Autor/autor.service';
import { CategoriaService, Categoria } from '../../../services/Categoria/categoria.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-actualizar-libro',
  templateUrl: './actualizar-libro.component.html',
  styleUrls: ['./actualizar-libro.component.css'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    CommonModule,
  ],
})
export class ActualizarLibroComponent implements OnInit {
  libroForm: FormGroup;
  autores: Autor[] = [];
  categorias: Categoria[] = [];

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private libroService: LibroService,
    private autorService: AutorService,
    private categoriaService: CategoriaService,
    private dialogRef: MatDialogRef<ActualizarLibroComponent>,
    @Inject(MAT_DIALOG_DATA) public libroId: number,
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

  ngOnInit(): void {
    this.cargarAutores();
    this.cargarCategorias();
    this.libroService.obtenerLibroPorId(this.libroId).subscribe(libro => {
      this.libroForm.patchValue(libro);
    });
  }

  private cargarAutores() {
    this.autorService.listarAutores().subscribe(autores => this.autores = autores);
  }

  private cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe(categorias => this.categorias = categorias);
  }

  get titulo() { return this.libroForm.get('titulo'); }
  get isbn() { return this.libroForm.get('isbn'); }
  get anioPublicacion() { return this.libroForm.get('anioPublicacion'); }
  get autor_id() { return this.libroForm.get('autor_id'); }
  get categoria_id() { return this.libroForm.get('categoria_id'); }

  actualizarLibro() {
    if (this.libroForm.valid) {
      this.libroService.actualizarLibro(this.libroId, this.libroForm.value).subscribe({
        next: () => {
          this.snackBar.open('✅ Libro actualizado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.dialogRef.close();
        },
        error: err => {
          console.error(err);
          this.snackBar.open('⚠️ Error al actualizar el libro', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        }
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
