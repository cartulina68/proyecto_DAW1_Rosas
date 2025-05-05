// src/app/components/categoria/crear-categoria/crear-categoria.component.ts
import { Component } from '@angular/core';
import { CategoriaService, Categoria } from '../../../services/Categoria/categoria.service';

@Component({
  selector: 'app-crear-categoria',
  templateUrl: './crear-categoria.component.html'
})
export class CrearCategoriaComponent {
  categoria: Categoria = {
    nombre: '',
    descripcion: ''
  };

  constructor(private categoriaService: CategoriaService) {}

  guardarCategoria() {
    this.categoriaService.crearCategoria(this.categoria).subscribe({
      next: () => {
        alert('Categoría creada con éxito');
        this.categoria = { nombre: '', descripcion: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar la categoría');
      }
    });
  }
}
