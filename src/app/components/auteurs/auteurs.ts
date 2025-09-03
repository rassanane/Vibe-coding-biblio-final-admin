import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { AuteursService, Auteur } from '../../services/auteurs';

@Component({
  selector: 'app-auteurs',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './auteurs.html',
  styleUrl: './auteurs.css'
})
export class AuteursComponent implements OnInit {
  auteurs: Auteur[] = [];
  selectedAuteur: Auteur = { nom: '', prenom: '' };
  isEditing = false;
  showForm = false;

  constructor(private auteursService: AuteursService) {}

  ngOnInit() {
    this.loadAuteurs();
  }

  loadAuteurs() {
    this.auteursService.getAll().subscribe({
      next: (data) => this.auteurs = data,
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  showAddForm() {
    this.selectedAuteur = { nom: '', prenom: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editAuteur(auteur: Auteur) {
    this.selectedAuteur = { ...auteur };
    this.isEditing = true;
    this.showForm = true;
  }

  saveAuteur() {
    if (this.isEditing && this.selectedAuteur.id) {
      this.auteursService.update(this.selectedAuteur.id, this.selectedAuteur).subscribe({
        next: () => {
          this.loadAuteurs();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la modification:', error)
      });
    } else {
      this.auteursService.create(this.selectedAuteur).subscribe({
        next: () => {
          this.loadAuteurs();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  deleteAuteur(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet auteur ?')) {
      this.auteursService.delete(id).subscribe({
        next: () => this.loadAuteurs(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedAuteur = { nom: '', prenom: '' };
    this.isEditing = false;
  }
}
