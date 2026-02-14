import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {CommonModule, DatePipe, isPlatformBrowser, NgClass} from '@angular/common';
import { RouterLink, RouterModule, ActivatedRoute } from '@angular/router';
import { EmpruntService } from '../../services/emprunt';
import { Emprunt } from '../../models/emprunt';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.html',
  styleUrls: ['./dashboard-user.css'],
  standalone: true,
  imports: [RouterLink, RouterModule, DatePipe, NgClass,CommonModule]
})
export class DashboardUser implements OnInit {

  user: any = null;
  userInitials: string = '';
  idUtilisateur: number = 0;

  emprunts: Emprunt[] = [];

  // Comptage des emprunts par statut
  empruntsEnCours: number = 0;
  empruntsEnRetard: number = 0;
  empruntsARetourner: number = 0;

  // Pour filtrer les emprunts affichés dans le tableau
  filterStatut: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private empruntService: EmpruntService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('currentUser');

      if (data) {
        const currentUser = JSON.parse(data);
        this.user = currentUser.data;
        this.idUtilisateur = this.user?.idUtilisateur || 0;

        const prenomInitial = this.user.prenom?.[0] || '';
        const nomInitial = this.user.nom?.[0] || '';
        this.userInitials = (prenomInitial + nomInitial).toUpperCase();

        // Charger tous les emprunts de l'utilisateur
        this.chargerEmprunts();

        // Récupérer le filtre passé dans l'URL si utilisateur clique sur carte
        this.route.queryParams.subscribe(params => {
          this.filterStatut = params['filter'] || '';
        });
      }
    }
  }
  getAuteurs(livre: any): string {
    if (!livre?.auteurs) return '';
    return livre.auteurs.map((a: { nom: any; }) => a.nom).join(', ');
  }

  isEnRetard(emprunt: Emprunt): boolean {
    if (emprunt.statut !== 'Valide' || !emprunt.dateRetour) return false;
    return new Date(emprunt.dateRetour) < new Date();
  }



  chargerEmprunts(): void {
    if (!this.idUtilisateur) return;

    this.empruntService.getParUtilisateur(this.idUtilisateur)
      .subscribe((emprunts: Emprunt[]) => {
        this.emprunts = emprunts;

        // Réinitialiser compteurs
        this.empruntsEnCours = 0;
        this.empruntsEnRetard = 0;
        this.empruntsARetourner = 0;

        const aujourdHui = new Date();

        emprunts.forEach(e => {
          switch(e.statut) {
            case 'En_attente':
              this.empruntsEnCours++;
              break;

            case 'Valide':
              const dateRetour = e.dateRetour ? new Date(e.dateRetour) : null;
              if (dateRetour && dateRetour < aujourdHui) {
                this.empruntsEnRetard++;
              } else {
                this.empruntsARetourner++;
              }
              break;

            case 'Refuse':
              // On peut afficher comme “demande refusée” dans tableau si besoin
              break;

            case 'Retourne':
              this.empruntsARetourner++;
              break;
          }
        });
      });
  }

  // Filtrer les emprunts pour le tableau selon statut ou carte cliquée
  get empruntsFiltres(): Emprunt[] {
    if (!this.filterStatut) return this.emprunts;

    switch(this.filterStatut) {
      case 'en-attente': return this.emprunts.filter(e => e.statut === 'En_attente');
      case 'retard': return this.emprunts.filter(e => e.statut === 'Valide' && e.dateRetour && new Date(e.dateRetour) < new Date());
      case 'a-retourner': return this.emprunts.filter(e => e.statut === 'Valide' && (!e.dateRetour || new Date(e.dateRetour) >= new Date()));
      default: return this.emprunts;
    }
  }
}
