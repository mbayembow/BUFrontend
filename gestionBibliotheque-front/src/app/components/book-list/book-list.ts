import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './book-list.html',
  styleUrls: ['./book-list.css']
})
export class BookListComponent implements OnInit {

  livres: any[] = [];

  constructor(private bookService: BookService) {}

  ngOnInit(): void {

    this.loadBooks();

  }

  loadBooks(): void {

    this.bookService.getAllBooks().subscribe({

      next: (data) => {

        this.livres = data;

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

  deleteBook(id: number): void {

    if (!confirm('Supprimer ce livre ?')) return;

    this.bookService.deleteBook(id).subscribe({

      next: () => {

        alert('Livre supprimé');

        this.loadBooks();

      },

      error: (err) => {

        console.error(err);

      }

    });

  }

}
