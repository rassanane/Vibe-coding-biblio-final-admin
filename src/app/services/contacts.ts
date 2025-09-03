import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Contact {
  id?: number;
  nom: string;
  email: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  private baseUrl = 'http://localhost:8080/api/contacts';
  private headers = new HttpHeaders({
    'Authorization': 'Basic ' + btoa('rachid:rachid123')
  });

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.baseUrl, { headers: this.headers });
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(this.baseUrl, contact, { headers: this.headers });
  }

  update(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${this.baseUrl}/${id}`, contact, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, { headers: this.headers });
  }
}
