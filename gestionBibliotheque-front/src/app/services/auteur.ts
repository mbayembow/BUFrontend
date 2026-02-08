import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuteurService {

  // URL du backend Spring Boot
  private apiUrl = 'http://localhost:8080/api/auteurs';

  constructor(private http: HttpClient) {}

  // 🔹 Créer un auteur
  createAuteur(auteur: any): Observable<any> {
    return this.http.post(this.apiUrl, auteur);
  }

  // 🔹 Modifier un auteur
  updateAuteur(id: number, auteur: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, auteur);
  }

  // 🔹 Supprimer un auteur
  deleteAuteur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer un auteur par ID
  getAuteurById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer tous les auteurs
  getAllAuteurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // 🔹 Rechercher des auteurs
  searchAuteurs(critere: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search`, {
      params: { critere }
    });
  }
}
