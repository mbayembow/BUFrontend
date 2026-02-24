import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { Livre } from '../models/livre';
import { Livre } from '../models/livre';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/livres';

  constructor(private http: HttpClient) {}

  // 📖 Récupérer tous les livres
  getAllBooks(): Observable<Livre[]> {
    return this.http.get<Livre[]>(this.apiUrl);
  }

  // 🔎 Rechercher des livres
  searchBooks(critere: string): Observable<Livre[]> {
    return this.http.get<Livre[]>(`${this.apiUrl}/recherche`, { params: { critere } });
  }

  // ➕ Ajouter un livre
  addBook(book: Livre): Observable<Livre> {
    return this.http.post<Livre>(this.apiUrl, book);
  }

  // ❌ Supprimer un livre
  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
