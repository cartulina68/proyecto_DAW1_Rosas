import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Categoria, CategoriaService } from '../../../services/Categoria/categoria.service';
import { CrearCategoriaComponent } from '../crear-categoria/crear-categoria.component';
import { ActualizarCategoriaComponent } from '../actualizar-categoria/actualizar-categoria.component';
import { EliminarCategoriaComponent } from '../eliminar-categoria/eliminar-categoria.component';

@Component({
  selector: 'app-listar-categorias',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './listar-categorias.component.html',
  styleUrl: './listar-categorias.component.css',
})
export class ListarCategoriasComponent {
  readonly dialog = inject(MatDialog);

  categorias: Categoria[] = [];
  displayedColumns: string[] = ['nombre', 'descripcion', 'acciones'];

  constructor(private categoriaService: CategoriaService) {
    this.cargarCategorias();
  }

  openEliminarCategoriaDialog(categoria: Categoria) {
    const dialogRef = this.dialog.open(EliminarCategoriaComponent, {
      data: categoria,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarCategorias();
    });
  }

  openActualizarCategoriaDialog(id: number) {
    const dialogRef = this.dialog.open(ActualizarCategoriaComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarCategorias();
    });
  }

  openCrearCategoriaDialog() {
    const dialogRef = this.dialog.open(CrearCategoriaComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.cargarCategorias();
    });
  }

  private cargarCategorias() {
    this.categoriaService.listarCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }
}
