import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environments';
import { Revision } from '../interfaces/revision';

@Injectable({
  providedIn: 'root'
})
export class RevisionService {
  private myAppUrl: string = environments.endpoint;
  private myApiUrl: string = 'api/revision';

  constructor(private http: HttpClient) { }

  getRevisiones(): Observable<Revision[]> {
    return this.http.get<Revision[]>(`${this.myAppUrl}/${this.myApiUrl}`);
  }

  buscarPorApellido(apellido: string): Observable<Revision[]> {
    return this.http.get<Revision[]>(`${this.myAppUrl}/${this.myApiUrl}/BuscarPorApellido/${apellido}`);
  }

  getRevisionById(id: number): Observable<Revision> {
    return this.http.get<Revision>(`${this.myAppUrl}/${this.myApiUrl}/${id}`);
  }

  createRevision(revision: Revision): Observable<Revision> {
    return this.http.post<Revision>(`${this.myAppUrl}/${this.myApiUrl}`, revision);
  }

  updateRevision(id: number, revision: Revision): Observable<void> {
    return this.http.put<void>(`${this.myAppUrl}/${this.myApiUrl}/${id}`, revision);
  }

  deleteRevision(id: number): Observable<void> {
    return this.http.delete<void>(`${this.myAppUrl}/${this.myApiUrl}/${id}`);
  }
}
