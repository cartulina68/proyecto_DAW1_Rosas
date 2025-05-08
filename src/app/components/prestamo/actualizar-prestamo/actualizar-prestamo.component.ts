import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Prestamo, PrestamoService } from '../../../services/Prestamo/prestamo.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

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
    MatCardModule
  ]
})
export class ActualizarPrestamoComponent implements OnInit {
  prestamoForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private prestamoService: PrestamoService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<ActualizarPrestamoComponent>,
    @Inject(MAT_DIALOG_DATA) public id: number
  ) {}

  ngOnInit(): void {
    this.prestamoForm = this.fb.group({
      idLibro: ['', Validators.required],
      idUsuario: ['', Validators.required],
      fechaPrestamo: ['', Validators.required],
      fechaDevolucion: ['', Validators.required],
    });

    this.prestamoService.obtenerPrestamoPorId(this.id).subscribe({
      next: (prestamo) => this.prestamoForm.patchValue(prestamo),
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
  }

  actualizarPrestamo() {
    if (this.prestamoForm.invalid) return;

    const datosActualizados: Prestamo = this.prestamoForm.value;
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
}
