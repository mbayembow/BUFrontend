import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Emprunt} from '../models/emprunt';

@Injectable({
  providedIn: 'root'
})
export class EmpruntService {
  exporterRapport() {
    throw new Error('Method not implemented.');
  }
  getEmpruntsRecents(): Observable<any[]> {
    throw new Error('Method not implemented.');
  }

  private baseUrl = 'http://localhost:8080/api/emprunts';

  constructor(private http: HttpClient) {}

  // --- Actions métier ---
  demanderEmprunt(idUtilisateur: number, idLivre: number): Observable<string> {
    const params = new HttpParams()
      .set('idUtilisateur', idUtilisateur)
      .set('idLivre', idLivre);
    return this.http.post(`${this.baseUrl}/demander`, null, { params, responseType: 'text' });
  }

  validerEmprunt(idEmprunt: number, idPersonnel: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${idEmprunt}/valider`, null, { params: { idPersonnel } });
  }

  refuserEmprunt(idEmprunt: number, idPersonnel: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${idEmprunt}/refuser`, null, { params: { idPersonnel } });
  }

  retournerLivre(idEmprunt: number, idPersonnel: number): Observable<void> {
    return this.http.patch<void>(`${this.baseUrl}/${idEmprunt}/retourner`, null, { params: { idPersonnel } });
  }

  // --- Consultations ---
  getTous(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(this.baseUrl);
  }

  getParUtilisateur(idUtilisateur: number): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.baseUrl}/utilisateur/${idUtilisateur}`);
  }

  supprimer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
