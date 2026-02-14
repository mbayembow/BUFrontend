import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class BookComponent {

  // Mode édition
  isEditMode: boolean = false;

  // Liste des catégories (temporaire)
  categories: string[] = [
    'Roman',
    'Science',
    'Histoire',
    'Informatique',
    'Mathématiques'
  ];

  // Objet Livre
  newBook: any = {
    title: '',
    reference: '',
    isbn: '',          // ✅ AJOUT ISBN
    category: '',
    available: true
  };

  // Ajouter un livre
  addBook(): void {
    console.log('Livre ajouté :', this.newBook);
    this.resetForm();
  }

  // Modifier un livre
  updateBook(): void {
    console.log('Livre modifié :', this.newBook);
    this.isEditMode = false;
    this.resetForm();
  }

  // Réinitialiser le formulaire
  resetForm(): void {
    this.newBook = {
      title: '',
      reference: '',
      isbn: '',        // ✅ RESET ISBN
      category: '',
      available: true
    };
    this.isEditMode = false;
  }
}
