import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MaisonEdition {
  id?: number;
  nom: string;
}

@Injectable({
  providedIn: 'root'
})
export class MaisonsEditionService {
  private baseUrl = 'http://localhost:8080/api/maisons-edition';
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('rachid:rachid123')
  });

  constructor(private http: HttpClient) {}

  getAll(): Observable<MaisonEdition[]> {
    return this.http.get<MaisonEdition[]>(this.baseUrl, { headers: this.headers });
  }

  getById(id: number): Observable<MaisonEdition> {
    return this.http.get<MaisonEdition>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  create(maisonEdition: MaisonEdition): Observable<MaisonEdition> {
    return this.http.post<MaisonEdition>(this.baseUrl, maisonEdition, { headers: this.headers });
  }

  update(id: number, maisonEdition: MaisonEdition): Observable<MaisonEdition> {
    return this.http.put<MaisonEdition>(`${this.baseUrl}/${id}`, maisonEdition, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
