import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.html',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class Utilisateur implements OnInit {
i: any;
p: any;
  modeEdition: boolean | undefined;
  indexEdition: number | undefined;
supprimerUtilisateur(index: any) {
  if (confirm('Voulez-vous vraiment supprimer cet utilisateur ?')) {
    this.utilisateurs.splice(index, 1);
    console.log(this.utilisateurs);
  }
  this.utilisateurs.splice(index, 1);
}
modifierUtilisateur(utilisateur: any, index: number): void {
  this.utilisateur.patchValue(utilisateur);
  this.modeEdition = true;
  this.indexEdition = index;
throw new Error('Method not implemented.');
}

  utilisateur!: FormGroup;
  utilisateurs: any[] = []; // ou créer une interface PersonneModel

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.utilisateur = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numTel: ['', Validators.required],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [ '', Validators.required ],
      nin : ['', Validators.required],
      nomUtilisateur : ['', Validators.required]
    });
  }

  ajouterUtilisateur(): void {
    if (this.utilisateur.valid) {
      this.utilisateurs.push(this.utilisateur.value);
      console.log(this.utilisateurs);
      this.utilisateur.reset();
    }
  }

  
}
