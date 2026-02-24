import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Livre } from '../../models/livre';
import { Auteur } from '../../models/auteur';
import { BookService } from '../../services/book';
import { AuteurService } from '../../services/auteur';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rechercher-livre',
  templateUrl: './rechercher-livre.html',
  styleUrls: ['./rechercher-livre.css'],
  standalone: true,
  imports: [CommonModule, FormsModule],
})
export class RechercherLivre implements OnInit {

  livres: Livre[] = [];
  resultatsRecherche: Livre[] = [];
  critere: string = '';
  auteurs: Auteur[] = [];

  constructor(
    private bookService: BookService,
    private auteurService: AuteurService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Charger les auteurs d'abord
    this.chargerAuteurs().then(() => {
      this.chargerLivres();
    });

    this.route.queryParams.subscribe(params => {
      this.critere = params['critere'] || '';
      if (this.critere) this.rechercher();
    });
  }

  // Charger les livres et mapper idAuteur correctement
  chargerLivres(): void {
    this.bookService.getAllBooks().subscribe((data: any[]) => {
      // Ici on s'assure que idAuteur est bien un nombre
      this.livres = data.map(livre => ({
        ...livre,
        idAuteur: livre.auteur?.idAuteur || null
      }));
      this.resultatsRecherche = this.livres;
    });
  }

  // Charger les auteurs
  chargerAuteurs(): Promise<void> {
    return new Promise((resolve) => {
      this.auteurService.getAll().subscribe((data: Auteur[]) => {
        this.auteurs = data;
        resolve();
      });
    });
  }

  // Recherche filtrée
  rechercher(): void {
    if (!this.critere.trim()) {
      this.resultatsRecherche = this.livres;
    } else {
      this.resultatsRecherche = this.livres.filter(livre =>
        livre.titre.toLowerCase().includes(this.critere.toLowerCase())
      );
    }
  }

  // Récupérer le nom complet de l'auteur
  getNomAuteur(idAuteur: number | null): string {
    if (!idAuteur) return 'Auteur inconnu';
    const auteur = this.auteurs.find(a => a.idAuteur === idAuteur);
    return auteur ? `${auteur.nom} ${auteur.prenom}` : 'Auteur inconnu';
  }
}
