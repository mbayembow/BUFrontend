import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HomeService } from '../../services/home';
import { EmpruntService } from '../../services/emprunt';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
 // 🔹 injecter service

interface Stat {
  label: string;
  value: number;
  icon: string;
}

interface Emprunt {
  livre: string;
  date: string;
  statut: 'EN_ATTENTE' | 'VALIDE' | 'SUPPRIME' | 'REFUSE' | 'ENREGISTRE';
}

interface Personnel {
  idPersonnel: number;
  nom: string;
  prenom: string;
  email: string;
  role: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.html',
})
export class HomeComponent implements OnInit {

  personnel!: Personnel;
  stats: Stat[] = [];
  emprunts: Emprunt[] = [];
empruntsTotal: number = 0;
livreTotal: number = 0;
nombreUtilisateurs: number = 0;

  constructor(
    private router: Router,
    private homeService: HomeService,
    private empruntService: EmpruntService,
    
  ) {}

  ngOnInit(): void {
    this.chargerDonnees();
  }

  private chargerDonnees(): void {
    // 🔹 Souscrire aux observables et stocker les valeurs pour le template
    this.homeService.getPersonnelConnecte().subscribe(p => this.personnel = p);
    this.homeService.getStatistiques().subscribe(s => this.stats = s);
    this.empruntService.getEmpruntsRecents().subscribe(e => this.emprunts = e);
  }

  // ================= ACTIONS RAPIDES =================
  ajouterLivre(): void { this.router.navigate(['/livres/ajouter']); }
  gererMembres(): void { this.router.navigate(['/membres']); }
  supprimerLivre(): void { this.router.navigate(['/livres']); }
  retournerLivre(): void { this.router.navigate(['/emprunts/retour']); }
  livresEnRetard(): void { this.router.navigate(['/emprunts/retard']); }
  exporterRapport(): void { this.empruntService.exporterRapport(); }
  allerProfil(): void { this.router.navigate(['/profil']); }
  deconnexion(): void {
    
    this.router.navigate(['/login']);
  }

  // ================= UTILITAIRE =================
  getBadgeClass(statut: string): string {
    switch (statut) {
      case 'EN_ATTENTE': return 'bg-warning';
      case 'VALIDE': return 'bg-success';
      case 'REFUSE': return 'bg-secondary';
      case 'SUPPRIME': return 'bg-danger';
      case 'ENREGISTRE': return 'bg-info';
      default: return 'bg-light text-dark';
    }
  }

}