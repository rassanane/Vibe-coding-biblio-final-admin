import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  identifiant = '';
  motPasse = '';
  errorMessage = '';
  isLoading = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.identifiant || !this.motPasse) {
      this.errorMessage = 'Veuillez saisir votre identifiant et mot de passe';
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.login(this.identifiant, this.motPasse).subscribe({
      next: (user) => {
        if (user.identifiant === this.identifiant && user.motPasse === this.motPasse) {
          this.authService.setAuthenticated(true);
          this.router.navigate(['/home']);
        } else {
          this.errorMessage = 'Identifiant ou mot de passe incorrect';
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Identifiant ou mot de passe incorrect';
        this.isLoading = false;
      }
    });
  }
}
