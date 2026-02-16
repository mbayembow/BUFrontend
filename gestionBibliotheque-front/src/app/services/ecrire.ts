import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EcrireService {

  private apiUrl = `${environment.apiUrl}/associations-auteurs-livres`;

  constructor(private http: HttpClient) {}

  // Associer auteur ↔ livre
  associer(idAuteur: number, idLivre: number): Observable<string> {
    const params = new HttpParams()
      .set('idAuteur', idAuteur)
      .set('idLivre', idLivre);

    return this.http.post(
      `${this.apiUrl}/associer`,
      null,
      { params, responseType: 'text' }
    );
  }

  // Dissocier auteur ↔ livre
  dissocier(idAuteur: number, idLivre: number): Observable<void> {
    const params = new HttpParams()
      .set('idAuteur', idAuteur)
      .set('idLivre', idLivre);

    return this.http.delete<void>(`${this.apiUrl}/dissocier`, { params });
  }

  // IDs auteurs par livre
  getAuteursParLivre(idLivre: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/livre/${idLivre}/auteurs`);
  }

  // IDs livres par auteur
  getLivresParAuteur(idAuteur: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/auteur/${idAuteur}/livres`);
  }
}
