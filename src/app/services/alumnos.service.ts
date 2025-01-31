import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { alumnos } from '../interfaces/alumnos';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {
  private myAppUrl: string = environments.endpoint;
  private myApiUrl: string = 'api/alumnos';

  constructor(private http: HttpClient) { }

  crearAlumno(alumno: alumnos): Observable<alumnos> {
    return this.http.post<alumnos>(`${this.myAppUrl}/${this.myApiUrl}/crear`, alumno);
  }

  eliminarAlumno(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}/${this.myApiUrl}/eliminar/${id}`);
  }

}
