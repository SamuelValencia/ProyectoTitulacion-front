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
  selector: 'app-docentes',
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
  templateUrl: './docentes.component.html',
  styleUrls: ['./docentes.component.css']
})
export class DocentesComponent {
  displayedColumns: string[] = ['nombre', 'apellido', 'cedula', 'rol', 'acciones'];
  
  roles: string[] = [
    'Supervisor de Tesis',
    'Gestor de Tesis'
  ];

  docentes: any[] = [];  // Initialize as empty array
  docenteForm!: FormGroup;
  isEditing = false;
  editingIndex: number = -1;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  private initForm() {
    this.docenteForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido: ['', [Validators.required, Validators.minLength(2)]],
      cedula: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      rol: ['', Validators.required]
    });
  }

  agregarDocente() {
    if (this.docenteForm.valid) {
      const nuevoDocente = {
        ...this.docenteForm.value,
        fecha: new Date()
      };

      if (this.isEditing) {
        this.docentes[this.editingIndex] = nuevoDocente;
        this.isEditing = false;
        this.editingIndex = -1;
      } else {
        this.docentes = [...this.docentes, nuevoDocente]; // Create a new array reference
      }
      
      console.log('Docente agregado:', nuevoDocente);
      console.log('Lista de docentes:', this.docentes);
      
      this.docenteForm.reset();
      this.initForm();
    } else {
      console.log('Form is invalid:', this.docenteForm.errors);
    }
  }

  editarDocente(docente: any, index: number) {
    console.log('Editando docente:', docente);
    this.isEditing = true;
    this.editingIndex = index;
    this.docenteForm.patchValue(docente);
  }

  eliminarDocente(index: number) {
    if (confirm('¿Está seguro de eliminar este docente?')) {
      this.docentes = this.docentes.filter((_, i) => i !== index); // Create a new array reference
      console.log('Docente eliminado. Lista actualizada:', this.docentes);
    }
  }

  cancelarEdicion() {
    this.docenteForm.reset();
    this.isEditing = false;
    this.editingIndex = -1;
    this.initForm();
  }

  getErrorMessage(controlName: string): string {
    const control = this.docenteForm.get(controlName);
    if (control?.hasError('required')) {
      return 'Este campo es requerido';
    }
    if (control?.hasError('minlength')) {
      return `Mínimo ${control.errors?.['minlength'].requiredLength} caracteres`;
    }
    if (control?.hasError('pattern') && controlName === 'cedula') {
      return 'La cédula debe tener 10 dígitos';
    }
    return '';
  }
}
