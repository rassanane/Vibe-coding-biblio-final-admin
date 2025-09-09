import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
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
  private get headers(): HttpHeaders {
    const basicAuth = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);
    return new HttpHeaders({
      'Authorization': `Basic ${basicAuth}`
    });
  }

  constructor(private http: HttpClient) {}

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(`${environment.apiUrl}/contacts`, { headers: this.headers });
  }

  getById(id: number): Observable<Contact> {
    return this.http.get<Contact>(`${environment.apiUrl}/contacts/${id}`, { headers: this.headers });
  }

  create(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${environment.apiUrl}/contacts`, contact, { headers: this.headers });
  }

  update(id: number, contact: Contact): Observable<Contact> {
    return this.http.put<Contact>(`${environment.apiUrl}/contacts/${id}`, contact, { headers: this.headers });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/contacts/${id}`, { headers: this.headers });
  }
}
