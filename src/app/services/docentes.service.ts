import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { docentes } from '../interfaces/docentes';

@Injectable({
  providedIn: 'root'
})
export class DocentesService {

  private myAppUrl: string = environments.endpoint;
    private myApiUrl: string = 'api/docentes';
  
    constructor(private http: HttpClient) { }

    crearDocente(docente: docentes): Observable<docentes> {
      return this.http.post<docentes>(`${this.myAppUrl}/${this.myApiUrl}/crear`, docente);
    }
    
    eliminarDocente(id: number): Observable<void> {
      return this.http.delete<void>(`${this.myAppUrl}/${this.myApiUrl}/eliminar/${id}`);
    }
    
}
