// src/app/services/usuario.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Usuario {
  id?: number;
  nombre: string;
  correo: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/usuarios';

  constructor(private http: HttpClient) {}

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, usuario);
  }
}
