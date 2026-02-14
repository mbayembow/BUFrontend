import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Emprunt } from '../../models/emprunt';
import { EmpruntService } from '../../services/emprunt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-emprunt',
  templateUrl: './all-emprunt.html',
  styleUrls: ['./all-emprunt.css'],
  standalone: true,
  imports: [CommonModule]
})
export class AllEmprunt implements OnInit {

  emprunts: Emprunt[] = [];          // Tous les emprunts de l'utilisateur
  empruntsFiltres: Emprunt[] = [];   // Emprunts filtrés selon le paramètre
  statutFilter: string = 'TOUS';     // Valeur du filtre
  idUtilisateur: number = 1;         // ID de l'utilisateur connecté (à adapter)

  // Map pour afficher des statuts conviviaux
  statutLabels: Record<string, string> = {
    'En_attente': 'En attente',
    'Valide': 'Validé',
    'Refuse': 'En retard',
    'Retourne': 'À retourner'
  };

  constructor(
    private empruntService: EmpruntService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const filter = params['filter'];

      // Adapter le filtre aux statuts backend
      const filtreMap: Record<string, string> = {
        'retard': 'Refuse',
        'a-retourner': 'Retourne',
        'en-attente': 'En_attente'
      };

      this.statutFilter = filtreMap[filter] || 'TOUS';
      this.chargerEmprunts();
    });
  }

  // Charger les emprunts de l'utilisateur
  chargerEmprunts(): void {
    this.empruntService.getParUtilisateur(this.idUtilisateur)
      .subscribe(data => {
        this.emprunts = data;
        this.appliquerFiltre();
      });
  }

  // Appliquer le filtre
  appliquerFiltre(): void {
    if (this.statutFilter === 'TOUS') {
      this.empruntsFiltres = this.emprunts;
    } else {
      this.empruntsFiltres = this.emprunts.filter(
        e => e.statut?.toLowerCase() === this.statutFilter.toLowerCase()
      );
    }
  }

  // Retourne le label lisible pour l'UI
  getLabel(statut: string | undefined): string {
    return statut ? this.statutLabels[statut] || statut : '';
  }

  // Retourne une classe bootstrap pour la couleur du statut
  getClass(statut: string | undefined): string {
    switch(statut) {
      case 'Valide': return 'text-success';
      case 'Retourne': return 'text-warning';
      case 'Refuse': return 'text-danger';
      case 'En_attente': return 'text-muted';
      default: return '';
    }
  }
}
