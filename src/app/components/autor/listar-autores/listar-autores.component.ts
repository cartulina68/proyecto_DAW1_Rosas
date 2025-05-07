import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Autor, AutorService } from '../../../services/Autor/autor.service';
import { CrearAutorComponent } from '../crear-autor/crear-autor.component';
import { ActualizarAutorComponent } from '../actualizar-autor/actualizar-autor.component';
import { EliminarAutorComponent } from '../eliminar-autor/eliminar-autor.component';

@Component({
  selector: 'app-listar-autores',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './listar-autores.component.html',
  styleUrl: './listar-autores.component.css',
})
export class ListarAutoresComponent {
  readonly dialog = inject(MatDialog);

  autores: Autor[] = [];
  displayedColumns: string[] = ['nombre', 'nacionalidad', 'acciones'];

  constructor(private autorService: AutorService) {
    this.cargarAutores();
  }

  openEliminarAutorDialog(autor: Autor) {
    const dialogRef = this.dialog.open(EliminarAutorComponent, {
      data: autor,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarAutores();
    });
  }

  openActualizarAutorDialog(id: number) {
    const dialogRef = this.dialog.open(ActualizarAutorComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarAutores();
    });
  }

  openCrearAutorDialog() {
    const dialogRef = this.dialog.open(CrearAutorComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.cargarAutores();
    });
  }

  private cargarAutores() {
    this.autorService.listarAutores().subscribe({
      next: (autores) => {
        this.autores = autores;
      },
      error: (err) => {
        console.error('Error al obtener autores:', err);
      }
    });
  }
}
