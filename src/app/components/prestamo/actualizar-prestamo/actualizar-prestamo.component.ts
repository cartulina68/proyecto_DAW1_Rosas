import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo, PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Usuario, UsuarioService } from '../../../services/Usuario/usuario.service';
import { Libro, LibroService } from '../../../services/Libro/libro.service';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';


@Component({
  selector: 'app-actualizar-prestamo',
  standalone: true,
  templateUrl: './actualizar-prestamo.component.html',
  styleUrls: ['./actualizar-prestamo.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
    MatDatepickerModule,
  ]
})
export class ActualizarPrestamoComponent {
  libros: Libro[] = [];
  usuarios: Usuario[] = [];
  prestamoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private prestamoService: PrestamoService,
    private libroService: LibroService,
    private usuarioService: UsuarioService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ActualizarPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {
    this.prestamoForm = this.fb.group({
      libroId: new FormControl({ value: '', disabled: false }, Validators.required),
      usuarioId: new FormControl({ value: '', disabled: false }, Validators.required),
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
    });

    this.prestamoService.obtenerPrestamoPorId(this.id).subscribe({
      next: (prestamo: any) => this.prestamoForm.patchValue({
        libroId: prestamo.libro.id,
        usuarioId: prestamo.usuario.id,
        fechaPrestamo: prestamo.fechaPrestamo,
        fechaDevolucion: prestamo.fechaDevolucion,
      }),
      error: (err) => {
        console.error('Error al cargar préstamo', err);
        this.snackBar.open('❌ No se pudo cargar el préstamo', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
        this.dialogRef.close();
      }
    });

    this.cargarLibros();
    this.cargarUsuarios();
  }

  actualizarPrestamo() {
    if (this.prestamoForm.invalid) return;

    const datosActualizados: Prestamo = {
      ...this.prestamoForm.value,
      usuarioId: this.prestamoForm.value.usuarioId
    }
    console.log(datosActualizados)

    this.prestamoService.actualizarPrestamo(this.id, datosActualizados).subscribe({
      next: () => {
        this.snackBar.open('✅ Préstamo actualizado correctamente', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-success']
        });
        this.dialogRef.close();
      },
      error: (err) => {
        console.error('Error al actualizar', err);
        this.snackBar.open('⚠️ Error al actualizar el préstamo', 'Cerrar', {
          duration: 3000,
          verticalPosition: 'top',
          panelClass: ['snackbar-error']
        });
      }
    });
  }

  cancelar() {
    this.dialogRef.close();
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
}
