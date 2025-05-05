// src/app/services/autor.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Autor {
  id?: number;
  nombre: string;
  nacionalidad: string;
}

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  private apiUrl = 'http://localhost:8080/api/autores';

  constructor(private http: HttpClient) {}

  crearAutor(autor: Autor): Observable<Autor> {
    return this.http.post<Autor>(this.apiUrl, autor);
  }
}
