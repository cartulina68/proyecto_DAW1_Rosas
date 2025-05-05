// src/app/services/prestamo.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Prestamo {
  id?: number;
  libro: any;     // Puedes tipar con Libro si importas el modelo
  usuario: any;   // Puedes tipar con Usuario si importas el modelo
  fechaPrestamo: string;      // formato ISO (yyyy-MM-dd)
  fechaDevolucion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8080/api/prestamos';

  constructor(private http: HttpClient) {}

  crearPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, prestamo);
  }
}
