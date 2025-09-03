import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { UtilisateursService, Utilisateur } from '../../services/utilisateurs';

@Component({
  selector: 'app-utilisateurs',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './utilisateurs.html',
  styleUrl: './utilisateurs.css'
})
export class UtilisateursComponent implements OnInit {
  utilisateurs: Utilisateur[] = [];
  selectedUtilisateur: Utilisateur = { nom: '', prenom: '', identifiant: '', motPasse: '' };
  isEditing = false;
  showForm = false;
  showPassword = false;

  constructor(private utilisateursService: UtilisateursService) {}

  ngOnInit() {
    this.loadUtilisateurs();
  }

  loadUtilisateurs() {
    this.utilisateursService.getAll().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  showAddForm() {
    this.selectedUtilisateur = { nom: '', prenom: '', identifiant: '', motPasse: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editUtilisateur(utilisateur: Utilisateur) {
    this.selectedUtilisateur = { ...utilisateur };
    this.isEditing = true;
    this.showForm = true;
  }

  saveUtilisateur() {
    if (this.isEditing && this.selectedUtilisateur.id) {
      this.utilisateursService.update(this.selectedUtilisateur.id, this.selectedUtilisateur).subscribe({
        next: () => {
          this.loadUtilisateurs();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la modification:', error)
      });
    } else {
      this.utilisateursService.create(this.selectedUtilisateur).subscribe({
        next: () => {
          this.loadUtilisateurs();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  deleteUtilisateur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.utilisateursService.delete(id).subscribe({
        next: () => this.loadUtilisateurs(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedUtilisateur = { nom: '', prenom: '', identifiant: '', motPasse: '' };
    this.isEditing = false;
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
