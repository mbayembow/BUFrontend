import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BookService } from '../../services/book';
import { Livre } from '../../models/livre';
import { BookListComponent } from '../book-list/book-list';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [CommonModule, FormsModule,BookListComponent],
  templateUrl: './book.html',
  styleUrls: ['./book.css']
})
export class BookComponent {

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
    idPersonnel: null
  };

  constructor(private bookService: BookService) {}

  // ➕ Ajouter livre
  addBook(): void {

    const payload: Livre = {
      titre: this.newBook.titre,
      reference: this.newBook.reference,
      isbn: this.newBook.isbn,
      status: this.newBook.status,
      stock: this.newBook.stock,
      quantite: this.newBook.quantite,
      imageUrl: this.newBook.imageUrl,
      idAuteur: this.newBook.idAuteur,
      idCategorie: this.newBook.idCategorie,
      idEditeur: this.newBook.idEditeur,
      idPersonnel: this.newBook.idPersonnel
    };

    this.bookService.addBook(payload).subscribe({

      next: () => {

        alert('Livre ajouté avec succès');

        this.resetForm();

      },

      error: (err) => {

        console.error(err);

        alert('Erreur ajout livre');

      }

    });

  }

  // reset form
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
