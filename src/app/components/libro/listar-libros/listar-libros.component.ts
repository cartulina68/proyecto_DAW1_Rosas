import { Component } from '@angular/core';
import { LibroService } from '../../../services/Libro/libro.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Libro } from '../../../services/Libro/libro.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-libros',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './listar-libros.component.html',
  styleUrl: './listar-libros.component.css'
})
export class ListarLibrosComponent {
  libros: Libro[] = [];
  displayedColumns: string[] = ['titulo', 'autor', 'categoria', 'anioPublicacion', 'acciones'];

  constructor(
    private libroService: LibroService,
    private router: Router
  ) {
    this.obtenerLibros();
  }

  obtenerLibros(): void {
    this.libroService.listarLibros().subscribe({
      next: (data) => {
        this.libros = data;
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
      }
    });
  }

  editarLibro(libro: Libro): void {
    this.router.navigate(['/editar-libro', libro.id]);
  }

  eliminarLibro(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este libro?')) {
      this.libroService.eliminarLibro(id).subscribe({
        next: () => {
          this.libros = this.libros.filter(libro => libro.id !== id);
        },
        error: (err) => {
          console.error('Error al eliminar libro:', err);
        }
      });
    }
  }
}
