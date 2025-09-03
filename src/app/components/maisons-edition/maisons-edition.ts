import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { MaisonsEditionService, MaisonEdition } from '../../services/maisons-edition';

@Component({
  selector: 'app-maisons-edition',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './maisons-edition.html',
  styleUrl: './maisons-edition.css'
})
export class MaisonsEditionComponent implements OnInit {
  maisonsEdition: MaisonEdition[] = [];
  selectedMaisonEdition: MaisonEdition = { nom: '' };
  isEditing = false;
  showForm = false;

  constructor(private maisonsEditionService: MaisonsEditionService) {}

  ngOnInit() {
    this.loadMaisonsEdition();
  }

  loadMaisonsEdition() {
    this.maisonsEditionService.getAll().subscribe({
      next: (data) => this.maisonsEdition = data,
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  showAddForm() {
    this.selectedMaisonEdition = { nom: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editMaisonEdition(maisonEdition: MaisonEdition) {
    this.selectedMaisonEdition = { ...maisonEdition };
    this.isEditing = true;
    this.showForm = true;
  }

  saveMaisonEdition() {
    if (this.isEditing && this.selectedMaisonEdition.id) {
      this.maisonsEditionService.update(this.selectedMaisonEdition.id, this.selectedMaisonEdition).subscribe({
        next: () => {
          this.loadMaisonsEdition();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la modification:', error)
      });
    } else {
      this.maisonsEditionService.create(this.selectedMaisonEdition).subscribe({
        next: () => {
          this.loadMaisonsEdition();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  deleteMaisonEdition(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette maison d\'édition ?')) {
      this.maisonsEditionService.delete(id).subscribe({
        next: () => this.loadMaisonsEdition(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedMaisonEdition = { nom: '' };
    this.isEditing = false;
  }
}
