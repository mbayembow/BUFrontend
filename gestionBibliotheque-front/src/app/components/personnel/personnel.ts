import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-personnel',
  standalone: true,
  templateUrl: './personnel.html',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class Personnel implements OnInit {

  personnel!: FormGroup;
  personnels: any[] = [];

  modeEdition: boolean = false;
  indexEdition: number | null = null;
p: any;
  i!: number;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.personnel = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required]
    });
  }

  // ➕ AJOUTER ou ✏️ MODIFIER
  ajouterPersonnel(): void {
    if (this.personnel.invalid) return;

    if (this.modeEdition && this.indexEdition !== null) {
      // Mode modification
      this.personnels[this.indexEdition] = this.personnel.value;
      this.modeEdition = false;
      this.indexEdition = null;
    } else {
      // Mode ajout
      this.personnels.push(this.personnel.value);
    }

    this.personnel.reset();
  }

  // ✏️ MODIFIER
  modifierPersonnel(personnel: any, index: number): void {
    this.personnel.patchValue(personnel);
    this.modeEdition = true;
    this.indexEdition = index;
  }

  // 🗑️ SUPPRIMER
  supprimerPersonnel(index: number): void {
    if (confirm('Voulez-vous vraiment supprimer ce personnel ?')) {
      this.personnels.splice(index, 1);
    }
  }
}
