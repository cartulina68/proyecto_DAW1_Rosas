import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { LibroService, Libro } from '../../../services/Libro/libro.service';
import { UsuarioService, Usuario } from '../../../services/Usuario/usuario.service';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-crear-prestamo',
  standalone: true,
  templateUrl: './crear-prestamo.component.html',
  styleUrl: './crear-prestamo.component.css',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
    MatCardModule,
    MatDatepickerModule,
  ],
})
export class CrearPrestamoComponent {
  prestamoForm: FormGroup;
  libros: Libro[] = [];
  usuarios: Usuario[] = [];

  constructor(
    private fb: FormBuilder,
    private prestamoService: PrestamoService,
    private libroService: LibroService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CrearPrestamoComponent>
  ) {
    this.prestamoForm = this.fb.group({
      libroId: ['', Validators.required],
      usuarioId: ['', Validators.required],
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
    });

    this.cargarLibros();
    this.cargarUsuarios();
  }

  cargarLibros() {
    this.libroService.listarLibros().subscribe((libros) => {
      this.libros = libros;
    });
  }

  cargarUsuarios() {
    this.usuarioService.listarUsuarios().subscribe((usuarios) => {
      this.usuarios = usuarios;
    });
  }

  guardarPrestamo() {
    if (this.prestamoForm.valid) {
      this.prestamoService.crearPrestamo(this.prestamoForm.value).subscribe({
        next: () => {
          this.snackBar.open('✅ Préstamo creado correctamente', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-success'],
          });
          this.dialogRef.close();
        },
        error: (err) => {
          console.error(err);
          this.snackBar.open('⚠️ Error al crear el préstamo', 'Cerrar', {
            duration: 3000,
            verticalPosition: 'top',
            panelClass: ['snackbar-error'],
          });
        },
      });
    }
  }

  cancelar() {
    this.dialogRef.close();
  }
}
