import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class BookComponent implements OnInit {

  livres: any[] = [];

  newBook: any = {
    titre: '',
    reference: '',
    isbn: '',
    status: '',
    stock: 0,
    quantite: 0,
    imageUrl: '',
    idAuteur: null,
    idCategorie: null,
    idEditeur: null,
    idPersonnel: null   // ✅ AJOUT ICI
  };

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.loadBooks();
  }

  // 🔄 Charger tous les livres
  loadBooks(): void {
    this.bookService.getAllBooks().subscribe({
      next: (data) => {
        this.livres = data;
      },
      error: (err) => {
        console.error('Erreur chargement livres', err);
      }
    });
  }

  // ➕ Ajouter un livre
  addBook(): void {

    const payload = {
      titre: this.newBook.titre,
      reference: this.newBook.reference,
      isbn: this.newBook.isbn,
      status: this.newBook.status,
      stock: this.newBook.stock,
      quantite: this.newBook.quantite,
      imageUrl: this.newBook.imageUrl,

      // ✅ Relations ManyToOne format correct
      auteur: { idAuteur: this.newBook.idAuteur },
      categorie: { idCategorie: this.newBook.idCategorie },
      editeur: { idEditeur: this.newBook.idEditeur },
      personnel: { idPersonnel: this.newBook.idPersonnel }
    };

    console.log("Payload envoyé :", payload); // 🔎 DEBUG

    this.bookService.addBook(payload).subscribe({
      next: () => {
        alert('Livre ajouté avec succès');
        this.resetForm();
        this.loadBooks();
      },
      error: (err) => {
        console.error('Erreur ajout livre', err);
        alert('Erreur lors de l’ajout du livre');
      }
    });
  }

  // 🗑️ Supprimer
  deleteBook(id: number): void {
    if (!confirm('Supprimer ce livre ?')) return;

    this.bookService.deleteBook(id).subscribe({
      next: () => {
        alert('Livre supprimé');
        this.loadBooks();
      },
      error: (err) => {
        console.error('Erreur suppression', err);
      }
    });
  }

  // ♻️ Reset
  resetForm(): void {
    this.newBook = {
      titre: '',
      reference: '',
      isbn: '',
      status: '',
      stock: 0,
      quantite: 0,
      imageUrl: '',
      idAuteur: null,
      idCategorie: null,
      idEditeur: null,
      idPersonnel: null
    };
  }
}
