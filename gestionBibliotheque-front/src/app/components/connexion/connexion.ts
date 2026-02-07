import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css']
})
export class Connexion implements OnInit {
goToInscription() {
throw new Error('Method not implemented.');
}

  connexion!: FormGroup;
  showPassword = false;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connexion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.connexion.invalid) {
      this.connexion.markAllAsTouched();
      return;
    }

    // Données du formulaire
    console.log(this.connexion.value);

    // TODO: appel API de connexion ici

    // Redirection après succès
    this.router.navigate(['/inscription']);
    // ou '/dashboard'
  }
}
