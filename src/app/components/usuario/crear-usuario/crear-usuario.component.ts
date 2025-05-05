// src/app/components/prestamo/crear-prestamo/crear-prestamo.component.ts
import { Component } from '@angular/core';
import { PrestamoService, Prestamo } from '../../../services/Prestamo/prestamo.service';

@Component({
  selector: 'app-crear-prestamo',
  templateUrl: './crear-prestamo.component.html'
})
export class CrearPrestamoComponent {
  prestamo: Prestamo = {
    libro: null,
    usuario: null,
    fechaPrestamo: '',
    fechaDevolucion: ''
  };

  constructor(private prestamoService: PrestamoService) {}

  guardarPrestamo() {
    this.prestamoService.crearPrestamo(this.prestamo).subscribe({
      next: () => {
        alert('Préstamo creado con éxito');
        this.prestamo = {
          libro: null,
          usuario: null,
          fechaPrestamo: '',
          fechaDevolucion: ''
        };
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el préstamo');
      }
    });
  }
}
