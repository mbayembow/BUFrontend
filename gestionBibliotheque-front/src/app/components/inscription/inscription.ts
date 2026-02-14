import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Utilisateur } from '../../models/utilisateur';
import { InscriptionService } from '../../services/inscription-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css']
})
export class InscriptionComponent implements OnInit {

  formInscription!: FormGroup; // Reactive Form
  message: string = '';
  erreur: boolean = false;

  constructor(
    private fb: FormBuilder,
    private inscriptionService: InscriptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.formInscription = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      telephone: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      carteIdentite: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  // Vérifie si un champ est invalide et touché
  isInvalid(field: string): boolean {
    const control = this.formInscription.get(field);
    return control ? control.invalid && control.touched : false;
  }

  // Soumission du formulaire
  onSubmit(): void {
    if (this.formInscription.invalid) {
      // marque tous les champs comme touchés pour afficher les erreurs
      this.formInscription.markAllAsTouched();
      return;
    }

    // Création de l'objet Utilisateur à partir des valeurs du formulaire
    const utilisateur: Utilisateur = {
      nom: this.formInscription.value.nom,
      prenom: this.formInscription.value.prenom,
      email: this.formInscription.value.email,
      nomUtilisateur: this.formInscription.value.username,
      motDePasse: this.formInscription.value.password,
      numTel: this.formInscription.value.telephone,
      role: 'USER',
      nin: this.formInscription.value.carteIdentite

    };

    this.inscriptionService.inscrire(utilisateur).subscribe({
      next: (res) => {
        this.erreur = false;
        this.message = 'Inscription réussie !';
        alert(this.message);
        this.router.navigateByUrl('/connexion');
        this.formInscription.reset();
      },
      error: (err) => {
        this.erreur = true;
        this.message = err.error?.message || "Erreur lors de l'inscription";
        alert(this.message);
      }
    });
  }
}
