import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// 🔹 Interfaces
export interface Personnel {
  idPersonnel: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

export interface Stat {
  label: string;
  value: number;
  icon: string;
}

export interface Emprunt {
  livre: string;
  date: string;
  statut: 'EN_ATTENTE' | 'VALIDE' | 'SUPPRIME' | 'REFUSE' | 'ENREGISTRE';
}

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private readonly API_URL = 'http://localhost:8080/api/home';

  constructor(private http: HttpClient) {}

  /**
   * Récupérer les informations du personnel connecté
   */
  getPersonnelConnecte(): Observable<Personnel> {
    return this.http.get<Personnel>(`${this.API_URL}/personnel`);
  }

  /**
   * Récupérer les statistiques du dashboard
   */
  getStatistiques(): Observable<Stat[]> {
    return this.http.get<Stat[]>(`${this.API_URL}/statistiques`);
  }

  /**
   * Récupérer les emprunts récents
   */
  getEmpruntsRecents(): Observable<Emprunt[]> {
    return this.http.get<Emprunt[]>(`${this.API_URL}/emprunts-recents`);
  }

  /**
   * Exporter un rapport (PDF / Excel)
   */
  exporterRapport(): Observable<Blob> {
    return this.http.get(`${this.API_URL}/export`, { responseType: 'blob' });
  }

}