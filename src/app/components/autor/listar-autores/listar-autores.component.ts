import { Component } from '@angular/core';
import { AutorService } from '../../../services/Autor/autor.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-listar-autores',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './listar-autores.component.html',
  styleUrl: './listar-autores.component.css'
})
export class ListarAutoresComponent {
  autores: any[] = []; // <- Aquí guardamos los autores
  displayedColumns: string[] = ['nombre', 'nacionalidad', 'acciones'];

  constructor(private autorService: AutorService) {
    this.autorService.listarAutores().subscribe({
      next: (autores) => {
        this.autores = autores; // <- Aquí se cargan para mostrarlos
      },
      error: (err) => {
        console.error('Error al obtener autores:', err);
      }
    });
  }
}
