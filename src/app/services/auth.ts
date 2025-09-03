import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
  identifiant: string;
  motPasse: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(identifiant: string, motPasse: string): Observable<Utilisateur> {
    console.log('Tentative de connexion avec:', { identifiant, motPasse });
    const basicAuth = btoa(`${environment.basicAuth.username}:${environment.basicAuth.password}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'Authorization': `Basic ${basicAuth}`
    });
    return this.http.post<Utilisateur>(`${this.baseUrl}/utilisateurs/auth`, 
      { identifiant, motPasse },
      { headers }
    );
  }

  setAuthenticated(isAuth: boolean) {
    this.isAuthenticatedSubject.next(isAuth);
    if (isAuth) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }

  logout() {
    this.setAuthenticated(false);
    this.router.navigate(['/login']);
  }

  checkAuthStatus() {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    this.isAuthenticatedSubject.next(isAuth);
    return isAuth;
  }
}
