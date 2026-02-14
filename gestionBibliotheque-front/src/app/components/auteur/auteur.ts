import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auteur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auteur.html'
})
export class AuteurComponent {

  // Mode édition
  isEditMode: boolean = false;

  // Auteur courant
  newAuteur: any = {
    nom: '',
    prenom: '',
    nationalite: ''
  };

  // Liste locale des auteurs (simulation)
  auteurs: any[] = [];

  // Ajouter auteur
  addAuteur(): void {
    this.auteurs.push({ ...this.newAuteur });
    console.log('Auteur ajouté :', this.newAuteur);
    this.resetForm();
  }

  // Préparer la modification
  editAuteur(auteur: any): void {
    this.newAuteur = { ...auteur };
    this.isEditMode = true;
  }

  // Modifier auteur
  updateAuteur(): void {
    console.log('Auteur modifié :', this.newAuteur);
    this.isEditMode = false;
    this.resetForm();
  }

  // Supprimer auteur
  deleteAuteur(index: number): void {
    this.auteurs.splice(index, 1);
  }

  // Reset formulaire
  resetForm(): void {
    this.newAuteur = {
      nom: '',
      prenom: '',
      nationalite: ''
    };
    this.isEditMode = false;
  }
}
