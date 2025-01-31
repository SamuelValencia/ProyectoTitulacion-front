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
import { RevisionService } from '../../services/revision.service';
import { Revision } from '../../interfaces/revision';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-revision',
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
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.css']
})
export class RevisionComponent implements OnInit {
  displayedColumns: string[] = ['nombre', 'apellido', 'tesis', 'proceso', 'docente'];
  propuestas: Revision[] = [
    {
      nombre: 'Carlos',
      apellido: 'Ruiz Hernández',
      tesis: 'Implementación de IA en Sistemas Educativos',
      proceso: 'En Proceso',
      docente: 'Dr. Juan Pérez'
    },
    {
      nombre: 'María',
      apellido: 'González López',
      tesis: 'Blockchain en Educación Superior',
      proceso: 'Ingresado',
      docente: 'Dra. Ana Martínez'
    }
  ]; // Initial data while API loads
  searchForm: FormGroup;
  filteredPropuestas: Revision[] = [];
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private revisionService: RevisionService,
    private snackBar: MatSnackBar
  ) {
    this.searchForm = this.fb.group({
      apellido: ['']
    });
    this.filteredPropuestas = [...this.propuestas]; // Initialize filtered data
  }

  ngOnInit() {
    this.loadRevisiones();
  }

  loadRevisiones() {
    this.isLoading = true;
    this.revisionService.getRevisiones()
      .pipe(
        catchError(error => {
          console.error('Error al cargar revisiones:', error);
          this.snackBar.open('Error al cargar las revisiones', 'Cerrar', { duration: 3000 });
          return of(this.propuestas); // Return initial data on error
        })
      )
      .subscribe(data => {
        this.propuestas = data;
        this.filteredPropuestas = [...data];
        this.isLoading = false;
      });
  }

  buscarPorApellido() {
    const apellido = this.searchForm.get('apellido')?.value;
    if (apellido) {
      this.isLoading = true;
      this.revisionService.buscarPorApellido(apellido)
        .pipe(
          catchError(error => {
            console.error('Error al buscar revisiones:', error);
            this.snackBar.open('Error al buscar revisiones', 'Cerrar', { duration: 3000 });
            // Filter locally if API fails
            return of(this.propuestas.filter(p => 
              p.apellido.toLowerCase().includes(apellido.toLowerCase())
            ));
          })
        )
        .subscribe(data => {
          this.filteredPropuestas = data;
          this.isLoading = false;
        });
    } else {
      this.filteredPropuestas = [...this.propuestas];
    }
  }

  getProcesoClass(proceso: string): string {
    return proceso.toLowerCase().replace(' ', '-');
  }

  getProcesoIcon(proceso: string): string {
    switch (proceso) {
      case 'Ingresado':
        return 'fiber_new';
      case 'En Proceso':
        return 'hourglass_empty';
      case 'Cancelado':
        return 'cancel';
      default:
        return 'help';
    }
  }
}
