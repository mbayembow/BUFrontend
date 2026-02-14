import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Utilisateur} from '../models/utilisateur';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InscriptionService {
  private baseUrl = 'http://localhost:8080/api/utilisateurs';

  constructor(private http: HttpClient) { }

  inscrire(utilisateur: Utilisateur): Observable<string> {
    return this.http.post(`${this.baseUrl}/inscription`, utilisateur, { responseType: 'text' });
  }
}
