import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Prestamo {
  id?: number;
  usuarioId: number;
  libroId: number;
  fechaPrestamo: string;
  fechaDevolucion: string;
}

@Injectable({
  providedIn: 'root'
})
export class PrestamoService {
  private apiUrl = 'http://localhost:8080/api/prestamos';

  constructor(private http: HttpClient) {}

  listarPrestamos(): Observable<Prestamo[]> {
    return this.http.get<Prestamo[]>(this.apiUrl);
  }

  crearPrestamo(prestamo: Prestamo): Observable<Prestamo> {
    return this.http.post<Prestamo>(this.apiUrl, {
      ...prestamo,
      libro: {
        id: prestamo.libroId,
      },
      usuario: {
        id: prestamo.usuarioId,
      },
    });
  }

  actualizarPrestamo(id: number, prestamo: Prestamo): Observable<Prestamo> {
    return this.http.put<Prestamo>(`${this.apiUrl}/${id}`, {
      ...prestamo,
      libro: {
        id: prestamo.libroId,
      },
      usuario: {
        id: prestamo.usuarioId,
      },
    });
  }

  eliminarPrestamo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  obtenerPrestamoPorId(id: number): Observable<Prestamo> {
    return this.http.get<Prestamo>(`${this.apiUrl}/${id}`);
  }
}
