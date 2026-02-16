import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuteurService } from '../../services/auteur';

@Component({
  selector: 'app-auteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auteur.html'
})
export class AuteurComponent implements OnInit {

  isEditMode = false;

  newAuteur: any = {
    idAuteur: null,
    nom: '',
    prenom: '',
    nationalite: ''
  };

  auteurs: any[] = [];

  constructor(private auteurService: AuteurService) {}

  ngOnInit(): void {
    this.loadAuteurs();
  }

  // 🔄 Récupérer les auteurs
  loadAuteurs(): void {
    this.auteurService.getAll().subscribe({
      next: (data) => this.auteurs = data,
      error: (err) => console.error('Erreur chargement auteurs', err)
    });
  }

  // ➕ Ajouter
  addAuteur(): void {
    this.auteurService.add(this.newAuteur).subscribe(() => {
      this.loadAuteurs();
      this.resetForm();
    });
  }

  // ✏️ Préparer modification
  editAuteur(auteur: any): void {
    this.newAuteur = { ...auteur };
    this.isEditMode = true;
  }

  // ✏️ Modifier
  updateAuteur(): void {
    this.auteurService.update(this.newAuteur.idAuteur, this.newAuteur)
      .subscribe(() => {
        this.loadAuteurs();
        this.resetForm();
      });
  }

  // 🗑️ Supprimer
  deleteAuteur(auteur: any): void {
    this.auteurService.delete(auteur.idAuteur).subscribe(() => {
      this.loadAuteurs();
    });
  }

  resetForm(): void {
    this.newAuteur = {
      idAuteur: null,
      nom: '',
      prenom: '',
      nationalite: ''
    };
    this.isEditMode = false;
  }
}
