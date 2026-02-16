import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  private apiUrl = 'http://localhost:8080/api/auteurs';

  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  add(auteur: any): Observable<any> {
    return this.http.post(this.apiUrl, auteur);
  }

  update(id: number, auteur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, auteur);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
