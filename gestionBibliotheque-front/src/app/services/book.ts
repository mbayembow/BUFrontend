import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/livres';

  constructor(private http: HttpClient) {}

  // 📖 Get all
  getAllBooks(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // ➕ Add
  addBook(book: any): Observable<any> {
    return this.http.post(this.apiUrl, book);
  }

  // ❌ Delete
  deleteBook(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
