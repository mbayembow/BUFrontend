import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EditeurService {

  // URL du backend Spring Boot
  private apiUrl = 'http://localhost:8080/api/editeurs';

  constructor(private http: HttpClient) {}

  // 🔹 Ajouter un éditeur
  ajouterEditeur(editeur: any): Observable<string> {
    return this.http.post(this.apiUrl, editeur, { responseType: 'text' });
  }

  // 🔹 Modifier un éditeur
  modifierEditeur(id: number, editeur: any): Observable<string> {
    return this.http.put(`${this.apiUrl}/${id}`, editeur, { responseType: 'text' });
  }

  // 🔹 Supprimer un éditeur
  supprimerEditeur(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer un éditeur par ID
  getEditeurById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // 🔹 Récupérer tous les éditeurs
  getTousLesEditeurs(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
