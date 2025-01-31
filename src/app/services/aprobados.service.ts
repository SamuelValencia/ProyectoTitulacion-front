import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { Aprobado } from '../interfaces/aprobados';

@Injectable({
  providedIn: 'root'
})
export class AprobadosService {
  private myAppUrl: string = environments.endpoint;
  private myApiUrl: string = 'api/aprobados';

  constructor(private http: HttpClient) { }

  getAprobados(): Observable<Aprobado[]> {
    return this.http.get<Aprobado[]>(`${this.myAppUrl}/${this.myApiUrl}`);
  }

  buscarPorApellido(apellido: string): Observable<Aprobado[]> {
    return this.http.get<Aprobado[]>(`${this.myAppUrl}/${this.myApiUrl}/BuscarPorApellido/${apellido}`);
  }

  getAprobadoById(id: number): Observable<Aprobado> {
    return this.http.get<Aprobado>(`${this.myAppUrl}/${this.myApiUrl}/${id}`);
  }

  createAprobado(aprobado: Aprobado): Observable<Aprobado> {
    return this.http.post<Aprobado>(`${this.myAppUrl}/${this.myApiUrl}`, aprobado);
  }

  updateAprobado(id: number, aprobado: Aprobado): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}/${this.myApiUrl}/${id}`, aprobado);
  }

  deleteAprobado(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}/${this.myApiUrl}/${id}`);
  }
}
