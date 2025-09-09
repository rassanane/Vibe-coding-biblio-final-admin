import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

export interface Utilisateur {
  id?: number;
  nom: string;
  prenom: string;
  identifiant: string;
  motPasse: string;
}

@Injectable({
  providedIn: 'root'
})
export class UtilisateursService {
  private get headers(): HttpHeaders {
    const basicAuth = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Utilisateur[]> {
    return this.http.get<Utilisateur[]>(`${environment.apiUrl}/utilisateurs`, { headers: this.headers });
  }

  getById(id: number): Observable<Utilisateur> {
    return this.http.get<Utilisateur>(`${environment.apiUrl}/utilisateurs/${id}`, { headers: this.headers });
  }

  create(utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.post<Utilisateur>(`${environment.apiUrl}/utilisateurs`, utilisateur, { headers: this.headers });
  }

  update(id: number, utilisateur: Utilisateur): Observable<Utilisateur> {
    return this.http.put<Utilisateur>(`${environment.apiUrl}/utilisateurs/${id}`, utilisateur, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/utilisateurs/${id}`, { headers: this.headers });
  }
}
