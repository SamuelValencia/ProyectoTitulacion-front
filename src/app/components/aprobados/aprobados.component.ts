import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { AprobadosService } from '../../services/aprobados.service';
import { Aprobado } from '../../interfaces/aprobados';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-aprobados',
  standalone: true,
  imports: [
    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  templateUrl: './aprobados.component.html',
  styleUrls: ['./aprobados.component.css']
})
export class AprobadosComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'propuesta', 'estado'];
  students: Aprobado[] = [
    {
      nombre: 'José',
      apellido: 'Pérez Martínez',
      propuesta: 'Sistema de Gestión Académica con IA',
      estado: 'Aprobado'
    },
    {
      nombre: 'Ana María',
      apellido: 'Gómez Ruiz',
      propuesta: 'Aplicación Móvil para Telemedicina',
      estado: 'Denegado'
    }
  ]; // Initial data while API loads
  searchForm: FormGroup;
  filteredStudents: Aprobado[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private aprobadosService: AprobadosService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      apellido: ['']
    });
    this.filteredStudents = [...this.students]; // Initialize filtered data
  }

  ngOnInit() {
    this.loadAprobados();
  }

  loadAprobados() {
    this.isLoading = true;
    this.aprobadosService.getAprobados()
      .pipe(
        catchError(error => {
          console.error('Error al cargar aprobados:', error);
          this.snackBar.open('Error al cargar los aprobados', 'Cerrar', { duration: 3000 });
          return of(this.students); // Return initial data on error
        })
      )
      .subscribe(data => {
        this.students = data;
        this.filteredStudents = [...data];
        this.isLoading = false;
      });
  }

  buscarPorApellido() {
    const apellido = this.searchForm.get('apellido')?.value;
    if (apellido) {
      this.isLoading = true;
      this.aprobadosService.buscarPorApellido(apellido)
        .pipe(
          catchError(error => {
            console.error('Error al buscar aprobados:', error);
            this.snackBar.open('Error al buscar aprobados', 'Cerrar', { duration: 3000 });
            // Filter locally if API fails
            return of(this.students.filter(s => 
              s.apellido.toLowerCase().includes(apellido.toLowerCase())
            ));
          })
        )
        .subscribe(data => {
          this.filteredStudents = data;
          this.isLoading = false;
        });
    } else {
      this.filteredStudents = [...this.students];
    }
  }

  getEstadoClass(estado: string): string {
    return estado.toLowerCase();
  }

  getEstadoIcon(estado: string): string {
    switch (estado) {
      case 'Aprobado':
        return 'check_circle';
      case 'Denegado':
        return 'cancel';
      default:
        return 'help';
    }
  }
}
