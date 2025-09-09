import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { MaisonEdition } from './maisons-edition';
import { Auteur } from './auteurs';

export interface Livre {
  id?: number;
  titre: string;
  datePublication: string;
  maisonEdition: MaisonEdition;
  auteurs: Auteur[];
}

@Injectable({
  providedIn: 'root'
})
export class LivresService {
  private get headers(): HttpHeaders {
    const basicAuth = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${environment.apiUrl}/livres`, { headers: this.headers });
  }

  getById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${environment.apiUrl}/livres/${id}`, { headers: this.headers });
  }

  create(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(`${environment.apiUrl}/livres`, livre, { headers: this.headers });
  }

  update(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${environment.apiUrl}/livres/${id}`, livre, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/livres/${id}`, { headers: this.headers });
  }
}
