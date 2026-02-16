import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EcrireService } from '../../services/ecrire';
import { AuteurService } from '../../services/auteur';
import { BookService } from '../../services/book';

@Component({
  selector: 'app-ecrire',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ecrire.html'
})
export class EcrireComponent implements OnInit {

  auteurs: any[] = [];
  livres: any[] = [];

  idAuteur!: number;
  idLivre!: number;

  auteursDuLivre: number[] = [];
  livresDeLAuteur: number[] = [];

  constructor(
    private ecrireService: EcrireService,
    private auteurService: AuteurService,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    this.loadAuteurs();
    this.loadLivres();
  }

  loadAuteurs() {
    this.auteurService.getAll().subscribe(data => this.auteurs = data);
  }

  loadLivres() {
    this.bookService.getAllBooks().subscribe(data => this.livres = data);
  }

  associer() {
    this.ecrireService.associer(this.idAuteur, this.idLivre).subscribe({
      next: res => alert(res),
      error: err => alert(err.error)
    });
  }

  dissocier() {
    this.ecrireService.dissocier(this.idAuteur, this.idLivre).subscribe(() => {
      alert('Association supprimée');
    });
  }

  chargerAuteursParLivre() {
    this.ecrireService.getAuteursParLivre(this.idLivre)
      .subscribe(data => this.auteursDuLivre = data);
  }

  chargerLivresParAuteur() {
    this.ecrireService.getLivresParAuteur(this.idAuteur)
      .subscribe(data => this.livresDeLAuteur = data);
  }
}
