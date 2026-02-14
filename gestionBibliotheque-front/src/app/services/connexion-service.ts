import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  id: number;
  email: string;
  nom: string;
  prenom: string;
  role: 'USER' | 'ADMIN';
}

@Injectable({
  providedIn: 'root',
})
export class ConnexionService {
  private baseUrl = 'http://localhost:8080/api/utilisateurs';
  private baseUrl1 ='http://localhost:8080/api/personnel';

  constructor(private http: HttpClient) {}

  login(email: string, motDePasse: string): Observable<AuthResponse> {
    const body = { email, motDePasse };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, body);
  }
  login1(email: string, motDePasse: string): Observable<AuthResponse> {
    const body = { email, motDePasse };
    return this.http.post<AuthResponse>(`${this.baseUrl1}/login`, body);
  }

}
