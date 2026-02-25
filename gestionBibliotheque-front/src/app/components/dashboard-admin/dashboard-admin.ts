import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css'],
})
export class DashboardAdmin implements OnInit {

  constructor(private router: Router) {}

  empruntsTotal: number = 0;
  livreTotal: number = 0;
  nombreUtilisateurs: number = 0;

  ngOnInit(): void {

  }

  // ================= ACTIONS RAPIDES =================

  ajouterLivre(): void {
    this.router.navigate(['/livres/ajouter']);
  }

  gererMembres(): void {
    this.router.navigate(['/membres']);
  }

  supprimerLivre(): void {
    this.router.navigate(['/livres']);
  }

  retournerLivre(): void {
    this.router.navigate(['/emprunts/retour']);
  }

  livresEnRetard(): void {
    this.router.navigate(['/emprunts/retard']);
  }

  deconnexion(): void {
    this.router.navigate(['/login']);
  }

}
