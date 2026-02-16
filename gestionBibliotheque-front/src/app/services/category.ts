import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

/* Interfaces */
export interface Category {
  idCategorie: number;
  nom: string;
  description?: string;
}

export interface CategorySend {
  nom: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.apiUrl}/categories`;

  constructor(private http: HttpClient) {}

  // 🔹 Récupérer toutes les catégories
  getAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  // 🔹 Récupérer une catégorie par ID
  getById(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Ajouter une catégorie
  create(category: CategorySend): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  // 🔹 Modifier une catégorie
  update(id: number, category: CategorySend): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${id}`, category);
  }

  // 🔹 Supprimer une catégorie
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Vérifier si un nom existe déjà
  checkNomExists(nom: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-nom`, {
      params: { nom }
    });
  }
}
