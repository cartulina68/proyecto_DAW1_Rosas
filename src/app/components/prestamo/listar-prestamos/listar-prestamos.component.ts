import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Prestamo, PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { CrearPrestamoComponent } from '../crear-prestamo/crear-prestamo.component';
import { ActualizarPrestamoComponent } from '../actualizar-prestamo/actualizar-prestamo.component';
import { EliminarPrestamoComponent } from '../eliminar-prestamo/eliminar-prestamo.component';

@Component({
  selector: 'app-listar-prestamos',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './listar-prestamos.component.html',
  styleUrl: './listar-prestamos.component.css',
})
export class ListarPrestamosComponent {
  readonly dialog = inject(MatDialog);

  prestamos: Prestamo[] = [];
  displayedColumns: string[] = ['usuario_id', 'libro_id', 'fechaPrestamo', 'fechaDevolucion', 'acciones'];

  constructor(private prestamoService: PrestamoService) {
    this.cargarPrestamos();
  }

  openEliminarPrestamoDialog(prestamo: Prestamo) {
    const dialogRef = this.dialog.open(EliminarPrestamoComponent, {
      data: prestamo,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarPrestamos();
    });
  }

  openActualizarPrestamoDialog(id: number) {
    const dialogRef = this.dialog.open(ActualizarPrestamoComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarPrestamos();
    });
  }

  openCrearPrestamoDialog() {
    const dialogRef = this.dialog.open(CrearPrestamoComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.cargarPrestamos();
    });
  }

  private cargarPrestamos() {
    this.prestamoService.listarPrestamos().subscribe({
      next: (prestamos) => {
        console.log(prestamos);
        this.prestamos = prestamos;
      },
      error: (err) => {
        console.error('Error al obtener préstamos:', err);
      }
    });
  }
}
