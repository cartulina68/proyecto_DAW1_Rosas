// src/app/services/libro.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Libro {
  id?: number;
  titulo: string;
  isbn: string;
  anioPublicacion: number;
  autor: any;       // Puedes tipar con Autor si importas el modelo
  categoria: any;   // Puedes tipar con Categoria si importas el modelo
}

@Injectable({
  providedIn: 'root'
})
export class LibroService {
  private apiUrl = 'http://localhost:8080/api/libros';

  constructor(private http: HttpClient) {}

  crearLibro(libro: Libro): Observable<Libro> {
    return this.http.post<Libro>(this.apiUrl, libro);
  }
}
