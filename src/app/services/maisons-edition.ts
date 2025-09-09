import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface MaisonEdition {
  id?: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaisonsEditionService {
  private get headers(): HttpHeaders {
    const basicAuth = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<MaisonEdition[]> {
    return this.http.get<MaisonEdition[]>(`${environment.apiUrl}/maisons-edition`, { headers: this.headers });
  }

  getById(id: number): Observable<MaisonEdition> {
    return this.http.get<MaisonEdition>(`${environment.apiUrl}/maisons-edition/${id}`, { headers: this.headers });
  }

  create(maisonEdition: MaisonEdition): Observable<MaisonEdition> {
    return this.http.post<MaisonEdition>(`${environment.apiUrl}/maisons-edition`, maisonEdition, { headers: this.headers });
  }

  update(id: number, maisonEdition: MaisonEdition): Observable<MaisonEdition> {
    return this.http.put<MaisonEdition>(`${environment.apiUrl}/maisons-edition/${id}`, maisonEdition, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/maisons-edition/${id}`, { headers: this.headers });
  }
}
