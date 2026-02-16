import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  private apiUrl = 'http://localhost:8080/api/editeurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  add(editeur: any): Observable<any> {
    return this.http.post(this.apiUrl, editeur, { responseType: 'text' });
  }

  update(id: number, editeur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, editeur, { responseType: 'text' });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
