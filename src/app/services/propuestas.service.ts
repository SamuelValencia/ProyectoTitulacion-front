import { Injectable } from '@angular/core';
import { environments } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { propuestas } from '../interfaces/propuestas';

@Injectable({
  providedIn: 'root'
})
export class PropuestasService {

  private myAppUrl: string = environments.endpoint;
      private myApiUrl: string = 'api/propuestas';
    
      constructor(private http: HttpClient) { }
      
      buscarPorCedula(cedula: number): Observable<propuestas> {
        return this.http.get<propuestas>(`${this.myAppUrl}/${this.myApiUrl}/BuscarPorCedula/${cedula}`);
      }
      
}
