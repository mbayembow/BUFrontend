import { Component, OnInit } from '@angular/core';
import { DashboardService,Livre} from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  emprunts: Livre[] = [];
  enCours = 0;
  retournes = 0;
  enRetard = 0;
  utilisateur: any;

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.utilisateur = JSON.parse(localStorage.getItem('utilisateur')!);

    this.dashboardService.getEmpruntsUtilisateur().subscribe(data => {
      this.emprunts = data;

      this.enCours = this.emprunts.filter(e => e.statut === 'Valide').length;
      this.retournes = this.emprunts.filter(e => e.statut === 'Retourne').length;
      this.enRetard = this.emprunts.filter(e =>
        e.statut !== 'Retourne' && new Date(e.dateRetour) < new Date()
      ).length;
    });
  }
}
