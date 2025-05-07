import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LibroService } from '../../../services/Libro/libro.service';
import { CategoriaService } from '../../../services/Categoria/categoria.service';
import { AutorService } from '../../../services/Autor/autor.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-crear-libro',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ],
  templateUrl: './crear-libro.component.html',
  styleUrls: ['./crear-libro.component.css']
})
export class CrearLibroComponent {
  libroForm: FormGroup;
  categorias: any[] = [];
  autores: any[] = [];

  constructor(
    private fb: FormBuilder,
    private libroService: LibroService,
    private categoriaService: CategoriaService,
    private autorService: AutorService
  ) {
    this.libroForm = this.fb.group({
      titulo: ['', Validators.required],
      anioPublicacion: ['', Validators.required],
      autorId: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });

    this.cargarCategorias();
    this.cargarAutores();
  }

  cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (data) => (this.categorias = data),
      error: (err) => console.error('Error al cargar categorías:', err)
    });
  }

  cargarAutores() {
    this.autorService.listarAutores().subscribe({
      next: (data) => (this.autores = data),
      error: (err) => console.error('Error al cargar autores:', err)
    });
  }

  guardarLibro() {
    if (this.libroForm.valid) {
      this.libroService.crearLibro(this.libroForm.value).subscribe({
        next: () => {
          alert('Libro registrado correctamente');
          this.libroForm.reset();
        },
        error: (err) => {
          console.error('Error al guardar libro:', err);
        }
      });
    }
  }
}
