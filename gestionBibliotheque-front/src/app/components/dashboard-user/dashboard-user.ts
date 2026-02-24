import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { RouterLink, RouterModule, ActivatedRoute ,Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Livre } from '../../models/livre';
import { BookService } from '../../services/book'; // si ton fichier service s'appelle book.ts

 import { EmpruntService } from '../../services/emprunt';
// import { Livre } from '../../models/livre';
//import { BookService } from '../../services/book'; // ou book.service si c'est le nom réel
import { Emprunt } from '../../models/emprunt';

@Component({
  selector: 'app-dashboard-user',
  templateUrl: './dashboard-user.html',
  styleUrls: ['./dashboard-user.css'],
  standalone: true,
  imports: [
    RouterLink,
    RouterModule,
    DatePipe,
    NgClass,
    CommonModule,
    FormsModule
  ]
})
export class DashboardUser implements OnInit {

  user: any = null;
  userInitials: string = '';
  idUtilisateur: number = 0;
  resultatsRecherche: Livre[] = []; // ← Déclaration obligatoire pour le template


  // =========================
  // 🔹 EMPRUNTS
  // =========================

  emprunts: Emprunt[] = [];

  empruntsEnCours: number = 0;
  empruntsEnRetard: number = 0;
  empruntsARetourner: number = 0;

  filterStatut: string = '';

  // =========================
  // 🔹 LIVRES (RECHERCHE)
  // =========================

  livres: Livre[] = [];
  critere: string = '';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private empruntService: EmpruntService,
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router,
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

        this.chargerEmprunts();
        this.chargerLivres();

        this.route.queryParams.subscribe(params => {
          this.filterStatut = params['filter'] || '';
        });
      }
    }
  }

  // =========================
  // 🔹 MÉTHODES LIVRES
  // =========================
  allerRecherche(): void {
    this.router.navigate(['/rechercher-livre'], { queryParams: { critere: this.critere } });
  }

  chargerLivres(): void {
    this.bookService.getAllBooks().subscribe((data: Livre[]) => {
      this.livres = data;
    });
  }

  rechercher(): void {
    if (this.critere.trim() === '') {
      // Si le champ est vide, on vide les résultats de recherche
      this.resultatsRecherche = [];
    } else {
      // Sinon on appelle le service et on met à jour resultatsRecherche
      this.bookService.searchBooks(this.critere).subscribe((data: Livre[]) => {
        this.resultatsRecherche = data;
      });
    }
  }

  getAuteurs(livre: any): string {
    if (!livre?.auteurs) return '';
    return livre.auteurs.map((a: { nom: any }) => a.nom).join(', ');
  }

  // =========================
  // 🔹 MÉTHODES EMPRUNTS
  // =========================

  isEnRetard(emprunt: Emprunt): boolean {
    if (emprunt.statut !== 'Valide' || !emprunt.dateRetour) return false;
    return new Date(emprunt.dateRetour) < new Date();
  }

  chargerEmprunts(): void {
    if (!this.idUtilisateur) return;

    this.empruntService.getParUtilisateur(this.idUtilisateur)
      .subscribe((emprunts: Emprunt[]) => {

        this.emprunts = emprunts;

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

            case 'Retourne':
              this.empruntsARetourner++;
              break;

            case 'Refuse':
              break;
          }
        });
      });
  }

  // =========================
  // 🔹 FILTRAGE TABLEAU
  // =========================

  get empruntsFiltres(): Emprunt[] {
    if (!this.filterStatut) return this.emprunts;

    switch(this.filterStatut) {

      case 'en-attente':
        return this.emprunts.filter(e => e.statut === 'En_attente');

      case 'retard':
        return this.emprunts.filter(e =>
          e.statut === 'Valide' &&
          e.dateRetour &&
          new Date(e.dateRetour) < new Date()
        );

      case 'a-retourner':
        return this.emprunts.filter(e =>
          e.statut === 'Valide' &&
          (!e.dateRetour || new Date(e.dateRetour) >= new Date())
        );

      default:
        return this.emprunts;
    }
  }
}
