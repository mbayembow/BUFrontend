import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-personne',
  standalone: true,
  templateUrl: './personne.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class Personne implements OnInit {

  personne!: FormGroup;
  personnes: any[] = [];

  modeEdition: boolean = false;
  indexEdition: number | null = null;
p: any;
  i!: number;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personne = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // ➕ AJOUTER / ✏️ MODIFIER
  ajouterPersonne(): void {
    if (this.personne.invalid) return;

    if (this.modeEdition && this.indexEdition !== null) {
      // MODIFIER
      this.personnes[this.indexEdition] = this.personne.value;
      this.modeEdition = false;
      this.indexEdition = null;
    } else {
      // AJOUTER
      this.personnes.push(this.personne.value);
    }

    console.log(this.personnes);
    this.personne.reset();
  }

  // ✏️ MODIFIER
  modifierPersonne(personne: any, index: number): void {
    this.personne.patchValue(personne);
    this.modeEdition = true;
    this.indexEdition = index;
  }

  // 🗑️ SUPPRIMER
  supprimerPersonne(index: number): void {
    if (confirm('Voulez-vous vraiment supprimer cette personne ?')) {
      this.personnes.splice(index, 1);
      console.log(this.personnes);
    }
  }
}
