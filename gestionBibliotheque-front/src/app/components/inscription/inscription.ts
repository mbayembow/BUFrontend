import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-inscription',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './inscription.html',
  styleUrls: ['./inscription.css']
})
export class Inscription implements OnInit {

  inscription!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inscription = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required], // ✅ AJOUT ICI
      nin: ['', Validators.required],
      nomUtilisateur: ['', Validators.required]
    });
  }

onSubmit() {
    if (this.inscription.valid) {
      // ici tu peux appeler ton API pour créer le compte
      // puis rediriger vers la page de connexion
      this.router.navigate(['/connexion']); // 🔹 Redirection
    }
  }
}
