// src/app/components/libro/crear-libro/crear-libro.component.ts
import { Component } from '@angular/core';
import { LibroService, Libro } from '../../../services/Libro/libro.service';

@Component({
  selector: 'app-crear-libro',
  templateUrl: './crear-libro.component.html'
})
export class CrearLibroComponent {
  libro: Libro = {
    titulo: '',
    isbn: '',
    anioPublicacion: new Date().getFullYear(),
    autor: null,
    categoria: null
  };

  constructor(private libroService: LibroService) {}

  guardarLibro() {
    this.libroService.crearLibro(this.libro).subscribe({
      next: () => {
        alert('Libro creado con éxito');
        this.libro = {
          titulo: '',
          isbn: '',
          anioPublicacion: new Date().getFullYear(),
          autor: null,
          categoria: null
        };
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el libro');
      }
    });
  }
}
