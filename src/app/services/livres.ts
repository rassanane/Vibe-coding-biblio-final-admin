import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  private baseUrl = 'http://localhost:8080/api/livres';
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('rachid:rachid123')
  });

  constructor(private http: HttpClient) {}

  getAll(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.baseUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Livre> {
    return this.http.get<Livre>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  create(livre: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.baseUrl, livre, { headers: this.headers });
  }

  update(id: number, livre: Livre): Observable<Livre> {
    return this.http.put<Livre>(`${this.baseUrl}/${id}`, livre, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
