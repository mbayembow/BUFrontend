import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpruntService } from '../../services/emprunt';
import { EmpruntFormComponent} from '../emprunt-form/emprunt-form';
import { EmpruntListComponent} from '../emprunt-list/emprunt-list';
import {Emprunt} from '../../models/emprunt';

@Component({
  selector: 'app-emprunt-page',
  standalone: true,
  imports: [CommonModule, EmpruntFormComponent, EmpruntListComponent],
  template: `
    <div class="container py-4">
      <h4 class="fw-bold mb-3"><i class="bi bi-journal-arrow-down"></i> Gestion des emprunts</h4>

      <app-emprunt-form (miseAJour)="chargerEmprunts()"></app-emprunt-form>

      <app-emprunt-list
        [emprunts]="emprunts"
        (valider)="valider($event)"
        (refuser)="refuser($event)"
        (retourner)="retourner($event)"
        (supprimer)="supprimer($event)">
      </app-emprunt-list>
    </div>
  `
})
export class EmpruntPageComponent implements OnInit {

  emprunts: Emprunt[] = [];
  idPersonnel = 1;

  constructor(private empruntService: EmpruntService) {}

  ngOnInit(): void {
    this.chargerEmprunts();
  }

  chargerEmprunts() {
    this.empruntService.getTous().subscribe(data => this.emprunts = data);
  }

  valider(id: number) {
    this.empruntService.validerEmprunt(id, this.idPersonnel).subscribe(() => this.chargerEmprunts());
  }

  refuser(id: number) {
    this.empruntService.refuserEmprunt(id, this.idPersonnel).subscribe(() => this.chargerEmprunts());
  }

  retourner(id: number) {
    this.empruntService.retournerLivre(id, this.idPersonnel).subscribe(() => this.chargerEmprunts());
  }

  supprimer(id: number) {
    this.empruntService.supprimer(id).subscribe(() => this.chargerEmprunts());
  }
}
