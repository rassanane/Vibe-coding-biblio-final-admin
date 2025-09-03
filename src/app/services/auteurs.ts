import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private baseUrl = 'http://localhost:8080/api/auteurs';
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('rachid:rachid123')
  });

  constructor(private http: HttpClient) {}

  getAll(): Observable<Auteur[]> {
    return this.http.get<Auteur[]>(this.baseUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Auteur> {
    return this.http.get<Auteur>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  create(auteur: Auteur): Observable<Auteur> {
    return this.http.post<Auteur>(this.baseUrl, auteur, { headers: this.headers });
  }

  update(id: number, auteur: Auteur): Observable<Auteur> {
    return this.http.put<Auteur>(`${this.baseUrl}/${id}`, auteur, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
