import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Auteur {
  id?: number;
  nom: string;
  prenom: string;
  livres?: any[];
}

@Injectable({
  providedIn: 'root'
})
export class AuteursService {
  private get headers(): HttpHeaders {
    const basicAuth = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(`${environment.apiUrl}/auteurs`, { headers: this.headers });
  }

  getById(id: number): Observable<Auteur> {
    return this.http.get<Auteur>(`${environment.apiUrl}/auteurs/${id}`, { headers: this.headers });
  }

  create(auteur: Auteur): Observable<Auteur> {
    return this.http.post<Auteur>(`${environment.apiUrl}/auteurs`, auteur, { headers: this.headers });
  }

  update(id: number, auteur: Auteur): Observable<Auteur> {
    return this.http.put<Auteur>(`${environment.apiUrl}/auteurs/${id}`, auteur, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/auteurs/${id}`, { headers: this.headers });
  }
}
