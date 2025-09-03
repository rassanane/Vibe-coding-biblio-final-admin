import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { LivresService, Livre } from '../../services/livres';
import { MaisonsEditionService, MaisonEdition } from '../../services/maisons-edition';
import { AuteursService, Auteur } from '../../services/auteurs';

@Component({
  selector: 'app-livres',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './livres.html',
  styleUrl: './livres.css'
})
export class LivresComponent implements OnInit {
  livres: Livre[] = [];
  maisonsEdition: MaisonEdition[] = [];
  auteurs: Auteur[] = [];
  selectedLivre: Livre = { 
    titre: '', 
    datePublication: '', 
    maisonEdition: { nom: '' }, 
    auteurs: [] 
  };
  selectedAuteurIds: number[] = [];
  isEditing = false;
  showForm = false;

  constructor(
    private livresService: LivresService,
    private maisonsEditionService: MaisonsEditionService,
    private auteursService: AuteursService
  ) {}

  ngOnInit() {
    this.loadLivres();
    this.loadMaisonsEdition();
    this.loadAuteurs();
  }

  loadLivres() {
    this.livresService.getAll().subscribe({
      next: (data) => this.livres = data,
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  loadMaisonsEdition() {
    this.maisonsEditionService.getAll().subscribe({
      next: (data) => this.maisonsEdition = data,
      error: (error) => console.error('Erreur lors du chargement des maisons d\'édition:', error)
    });
  }

  loadAuteurs() {
    this.auteursService.getAll().subscribe({
      next: (data) => this.auteurs = data,
      error: (error) => console.error('Erreur lors du chargement des auteurs:', error)
    });
  }

  showAddForm() {
    this.selectedLivre = { 
      titre: '', 
      datePublication: '', 
      maisonEdition: { nom: '' }, 
      auteurs: [] 
    };
    this.selectedAuteurIds = [];
    this.isEditing = false;
    this.showForm = true;
  }

  editLivre(livre: Livre) {
    this.selectedLivre = { 
      ...livre, 
      maisonEdition: { ...livre.maisonEdition },
      auteurs: [...livre.auteurs]
    };
    
    // Initialiser les IDs des auteurs sélectionnés
    this.selectedAuteurIds = livre.auteurs
      .map(a => a.id)
      .filter((id): id is number => id !== undefined);
    
    // S'assurer que l'ID de la maison d'édition est défini
    setTimeout(() => {
      if (!this.selectedLivre.maisonEdition.id && livre.maisonEdition.nom) {
        const maisonTrouvee = this.maisonsEdition.find(m => m.nom === livre.maisonEdition.nom);
        if (maisonTrouvee) {
          this.selectedLivre.maisonEdition = maisonTrouvee;
        }
      }
    }, 0);
    
    this.isEditing = true;
    this.showForm = true;
  }

  onMaisonEditionChange(event: any) {
    const maisonId = parseInt(event.target.value);
    const maisonEdition = this.maisonsEdition.find(m => m.id === maisonId);
    if (maisonEdition) {
      this.selectedLivre.maisonEdition = maisonEdition;
    }
  }

  onAuteurToggle(auteurId: number, event: any) {
    if (event.target.checked) {
      if (!this.selectedAuteurIds.includes(auteurId)) {
        this.selectedAuteurIds.push(auteurId);
      }
    } else {
      this.selectedAuteurIds = this.selectedAuteurIds.filter(id => id !== auteurId);
    }
    
    // Mettre à jour la liste des auteurs sélectionnés
    this.selectedLivre.auteurs = this.auteurs.filter(a => 
      a.id && this.selectedAuteurIds.includes(a.id)
    );
  }

  isAuteurSelected(auteurId: number): boolean {
    return this.selectedAuteurIds.includes(auteurId);
  }

  saveLivre() {
    // S'assurer que les auteurs sélectionnés sont à jour
    this.selectedLivre.auteurs = this.auteurs.filter(a => 
      a.id && this.selectedAuteurIds.includes(a.id)
    );
    
    console.log('Données envoyées au backend:', this.selectedLivre);
    
    if (this.isEditing && this.selectedLivre.id) {
      this.livresService.update(this.selectedLivre.id, this.selectedLivre).subscribe({
        next: (response) => {
          console.log('Réponse du backend:', response);
          this.loadLivres();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la modification:', error)
      });
    } else {
      this.livresService.create(this.selectedLivre).subscribe({
        next: () => {
          this.loadLivres();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  deleteLivre(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      this.livresService.delete(id).subscribe({
        next: () => this.loadLivres(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedLivre = { 
      titre: '', 
      datePublication: '', 
      maisonEdition: { nom: '' }, 
      auteurs: [] 
    };
    this.selectedAuteurIds = [];
    this.isEditing = false;
  }
}
