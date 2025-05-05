// src/app/components/usuario/crear-usuario/crear-usuario.component.ts
import { Component } from '@angular/core';
import { UsuarioService, Usuario } from '../../../services/Usuario/usuario.service';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html'
})
export class CrearUsuarioComponent {
  usuario: Usuario = {
    nombre: '',
    correo: '',
    telefono: ''
  };

  constructor(private usuarioService: UsuarioService) {}

  guardarUsuario() {
    this.usuarioService.crearUsuario(this.usuario).subscribe({
      next: () => {
        alert('Usuario creado con éxito');
        this.usuario = { nombre: '', correo: '', telefono: '' };
      },
      error: (err) => {
        console.error(err);
        alert('Error al guardar el usuario');
      }
    });
  }
}
