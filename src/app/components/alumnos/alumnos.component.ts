import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alumnos',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './alumnos.component.html',
  styleUrls: ['./alumnos.component.css']
})
export class AlumnosComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'carrera', 'tesis', 'acciones'];
  
  carreras: string[] = [
    'Ingeniería en Sistemas Computacionales',
    'Ingeniería en Software',
    'Ingeniería en Networking y Telecomunicaciones'
  ];

  students: any[] = [];  // Initialize as empty array
  alumnoForm!: FormGroup;
  isEditing = false;
  editingIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.alumnoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      carrera: ['', Validators.required],
      tesis: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  agregarAlumno() {
    if (this.alumnoForm.valid) {
      const nuevoAlumno = {
        ...this.alumnoForm.value,
        fecha: new Date()
      };

      if (this.isEditing) {
        this.students[this.editingIndex] = nuevoAlumno;
        this.isEditing = false;
        this.editingIndex = -1;
      } else {
        this.students = [...this.students, nuevoAlumno]; // Create a new array reference
      }
      
      console.log('Alumno agregado:', nuevoAlumno);
      console.log('Lista de alumnos:', this.students);
      
      this.alumnoForm.reset();
      this.initForm();
    } else {
      console.log('Form is invalid:', this.alumnoForm.errors);
    }
  }

  editarAlumno(alumno: any, index: number) {
    console.log('Editando alumno:', alumno);
    this.isEditing = true;
    this.editingIndex = index;
    this.alumnoForm.patchValue(alumno);
  }

  eliminarAlumno(index: number) {
    if (confirm('¿Está seguro de eliminar este alumno?')) {
      this.students = this.students.filter((_, i) => i !== index); // Create a new array reference
      console.log('Alumno eliminado. Lista actualizada:', this.students);
    }
  }

  cancelarEdicion() {
    this.alumnoForm.reset();
    this.isEditing = false;
    this.editingIndex = -1;
    this.initForm();
  }

  getErrorMessage(field: string): string {
    const control = this.alumnoForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo es obligatorio';
    }
    if (control?.hasError('minlength')) {
      const minLength = control.getError('minlength').requiredLength;
      return `Mínimo ${minLength} caracteres`;
    }
    if (control?.hasError('pattern') && field === 'cedula') {
      return 'La cédula debe tener 10 dígitos numéricos';
    }
    return '';
  }
}
