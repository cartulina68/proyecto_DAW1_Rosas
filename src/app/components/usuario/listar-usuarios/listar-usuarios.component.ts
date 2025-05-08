import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Usuario, UsuarioService } from '../../../services/Usuario/usuario.service';
import { CrearUsuarioComponent } from '../crear-usuario/crear-usuario.component';
import { ActualizarUsuarioComponent } from '../actualizar-usuario/actualizar-usuario.component';
import { EliminarUsuarioComponent } from '../eliminar-usuario/eliminar-usuario.component';

@Component({
  selector: 'app-listar-usuarios',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './listar-usuarios.component.html',
  styleUrl: './listar-usuarios.component.css',
})
export class ListarUsuariosComponent {
  readonly dialog = inject(MatDialog);

  usuarios: Usuario[] = [];
  displayedColumns: string[] = ['nombre', 'correo', 'telefono', 'acciones'];

  constructor(private usuarioService: UsuarioService) {
    this.cargarUsuarios();
  }

  openEliminarUsuarioDialog(usuario: Usuario) {
    const dialogRef = this.dialog.open(EliminarUsuarioComponent, {
      data: usuario,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarUsuarios();
    });
  }

  openActualizarUsuarioDialog(id: number) {
    const dialogRef = this.dialog.open(ActualizarUsuarioComponent, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cargarUsuarios();
    });
  }

  openCrearUsuarioDialog() {
    const dialogRef = this.dialog.open(CrearUsuarioComponent);

    dialogRef.afterClosed().subscribe(() => {
      this.cargarUsuarios();
    });
  }

  private cargarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe({
      next: (usuarios) => {
        this.usuarios = usuarios;
      },
      error: (err) => {
        console.error('Error al obtener usuarios:', err);
      }
    });
  }
}
