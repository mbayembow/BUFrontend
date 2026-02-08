import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = 'http://localhost:8080/api/categories';

  constructor(private http: HttpClient) {}

  // 🔹 Créer une catégorie
  create(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category);
  }

  // 🔹 Modifier une catégorie
  update(id: number, category: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, category);
  }

  // 🔹 Supprimer une catégorie
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer toutes les catégories
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Récupérer une catégorie par ID
  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer une catégorie par nom
  getByNom(nom: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/nom/${nom}`);
  }

  // 🔹 Vérifier si un nom existe déjà
  checkNomExists(nom: string): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/check-nom?nom=${nom}`
    );
  }
}
