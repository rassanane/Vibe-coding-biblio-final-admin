import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header';
import { FooterComponent } from '../footer/footer';
import { ContactsService, Contact } from '../../services/contacts';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, FormsModule, HeaderComponent, FooterComponent],
  templateUrl: './contacts.html',
  styleUrl: './contacts.css'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContact: Contact = { nom: '', email: '', message: '' };
  isEditing = false;
  showForm = false;

  constructor(private contactsService: ContactsService) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.contactsService.getAll().subscribe({
      next: (data) => this.contacts = data,
      error: (error) => console.error('Erreur lors du chargement:', error)
    });
  }

  showAddForm() {
    this.selectedContact = { nom: '', email: '', message: '' };
    this.isEditing = false;
    this.showForm = true;
  }

  editContact(contact: Contact) {
    this.selectedContact = { ...contact };
    this.isEditing = true;
    this.showForm = true;
  }

  saveContact() {
    if (this.isEditing && this.selectedContact.id) {
      this.contactsService.update(this.selectedContact.id, this.selectedContact).subscribe({
        next: () => {
          this.loadContacts();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la modification:', error)
      });
    } else {
      this.contactsService.create(this.selectedContact).subscribe({
        next: () => {
          this.loadContacts();
          this.cancelForm();
        },
        error: (error) => console.error('Erreur lors de la création:', error)
      });
    }
  }

  deleteContact(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce contact ?')) {
      this.contactsService.delete(id).subscribe({
        next: () => this.loadContacts(),
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }

  cancelForm() {
    this.showForm = false;
    this.selectedContact = { nom: '', email: '', message: '' };
    this.isEditing = false;
  }
}
