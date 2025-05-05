// src/app/components/autor/crear-autor/crear-autor.component.ts
import { Component } from '@angular/core';
import { AutorService, Autor } from '../../../services/Autor/autor.service';

@Component({
  selector: 'app-crear-autor',
  templateUrl: './crear-autor.component.html'
})
export class CrearAutorComponent {
  autor: Autor = {
    nombre: '',
    nacionalidad: ''
  };

  constructor(private autorService: AutorService) {}

  guardarAutor() {
    this.autorService.crearAutor(this.autor).subscribe({
      next: () => {
        alert('Autor creado con éxito');
        this.autor = { nombre: '', nacionalidad: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el autor');
      }
    });
  }
}
