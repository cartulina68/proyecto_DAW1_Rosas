// src/app/services/categoria.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Categoria {
  id?: number;
  nombre: string;
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/categorias';

  constructor(private http: HttpClient) {}

  crearCategoria(categoria: Categoria): Observable<Categoria> {
    return this.http.post<Categoria>(this.apiUrl, categoria);
  }
}
