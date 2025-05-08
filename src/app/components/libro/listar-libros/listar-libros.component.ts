import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Libro, LibroService } from '../../../services/Libro/libro.service';
import { CrearLibroComponent } from '../crear-libro/crear-libro.component';
import { ActualizarLibroComponent } from '../actualizar-libro/actualizar-libro.component';
import { EliminarLibroComponent } from '../eliminar-libro/eliminar-libro.component';

@Component({
  selector: 'app-listar-libros',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './listar-libros.component.html',
  styleUrl: './listar-libros.component.css',
})
export class ListarLibrosComponent {
  readonly dialog = inject(MatDialog);

  libros: Libro[] = [];
  displayedColumns: string[] = ['titulo', 'isbn', 'anioPublicacion', 'autor', 'categoria', 'acciones'];

  constructor(private libroService: LibroService) {
    this.cargarLibros();
  }

  openEliminarLibroDialog(libro: Libro) {
    const dialogRef = this.dialog.open(EliminarLibroComponent, {
      data: libro,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarLibros();
    });
  }

  openActualizarLibroDialog(id: number) {
    const dialogRef = this.dialog.open(ActualizarLibroComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarLibros();
    });
  }

  openCrearLibroDialog() {
    const dialogRef = this.dialog.open(CrearLibroComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.cargarLibros();
    });
  }

  private cargarLibros() {
    this.libroService.listarLibros().subscribe({
      next: (libros) => {
        console.log(libros)
        this.libros = libros;
      },
      error: (err) => {
        console.error('Error al obtener libros:', err);
      }
    });
  }
}
