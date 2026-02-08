import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = 'http://localhost:8080/api/livres';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  add(book: any): Observable<string> {
    return this.http.post(this.apiUrl, book, { responseType: 'text' });
  }

  update(id: number, book: any): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, book, { responseType: 'text' });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(critere: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recherche?critere=${critere}`);
  }

  updateStock(id: number, quantite: number): Observable<string> {
    return this.http.patch(
      `${this.apiUrl}/${id}/stock?quantite=${quantite}`,
      {},
      { responseType: 'text' }
    );
  }
}
