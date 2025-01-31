import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { PropuestasService } from '../../services/propuestas.service';
import { propuestas } from '../../interfaces/propuestas';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-propuestas',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './propuestas.component.html',
  styleUrls: ['./propuestas.component.css']
})
export class PropuestasComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'curso', 'propuesta', 'acciones'];
  propuestas: propuestas[] = [];
  propuestaForm: FormGroup;
  isEditing = false;
  editingIndex: number = -1;
  searchForm: FormGroup;
  filteredPropuestas: propuestas[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private propuestasService: PropuestasService,
    private snackBar: MatSnackBar
  ) {
    this.propuestaForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      curso: ['', [Validators.required, Validators.min(1), Validators.max(10)]],
      propuesta: ['', [Validators.required, Validators.minLength(10)]]
    });

    this.searchForm = this.fb.group({
      cedula: ['']
    });
  }

  ngOnInit() {
    this.loadPropuestas();
  }

  loadPropuestas() {
    // TODO: Add a method in the service to get all propuestas
    // For now, initialize with empty array
    this.propuestas = [];
    this.filteredPropuestas = [];
  }

  agregarPropuesta() {
    if (this.propuestaForm.valid) {
      const newPropuesta = this.propuestaForm.value;
      // TODO: Add a method in the service to create propuesta
      this.propuestas.push(newPropuesta);
      this.filteredPropuestas = [...this.propuestas];
      this.propuestaForm.reset();
      this.snackBar.open('Propuesta agregada con éxito', 'Cerrar', { duration: 3000 });
    }
  }

  editarPropuesta(propuesta: propuestas, index: number) {
    this.isEditing = true;
    this.editingIndex = index;
    this.propuestaForm.patchValue(propuesta);
  }

  eliminarPropuesta(index: number) {
    if (confirm('¿Está seguro de eliminar esta propuesta?')) {
      // TODO: Add a method in the service to delete propuesta
      this.propuestas.splice(index, 1);
      this.filteredPropuestas = [...this.propuestas];
      this.snackBar.open('Propuesta eliminada con éxito', 'Cerrar', { duration: 3000 });
    }
  }

  cancelarEdicion() {
    this.isEditing = false;
    this.editingIndex = -1;
    this.propuestaForm.reset();
  }

  buscarPorCedula() {
    const cedula = this.searchForm.get('cedula')?.value;
    if (cedula) {
      this.isLoading = true;
      this.propuestasService.buscarPorCedula(Number(cedula)).subscribe({
        next: (data) => {
          if (data) {
            this.filteredPropuestas = [data];
          } else {
            this.filteredPropuestas = [];
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al buscar propuesta:', error);
          this.snackBar.open('Error al buscar propuesta', 'Cerrar', { duration: 3000 });
          this.isLoading = false;
        }
      });
    } else {
      this.filteredPropuestas = [...this.propuestas];
    }
  }

  getErrorMessage(controlName: string, form: FormGroup): string {
    const control = form.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern') && controlName === 'cedula') {
      return 'La cédula debe tener 10 dígitos';
    }
    if (control?.hasError('min') || control?.hasError('max')) {
      return 'El curso debe estar entre 1 y 10';
    }
    return '';
  }
}
