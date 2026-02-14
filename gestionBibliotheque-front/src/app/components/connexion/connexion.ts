import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ConnexionService } from '../../services/connexion-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  standalone: true,
  templateUrl: './connexion.html',
  styleUrls: ['./connexion.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ConnexionComponent implements OnInit {

  connexion!: FormGroup;
  submitted = false;
  erreur: string = '';

  constructor(
    private fb: FormBuilder,
    private connexionService: ConnexionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.connexion = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: [false],
      type: ['USER'] // USER par défaut
    });
  }

  get f() {
    return this.connexion.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    this.erreur = '';

    if (this.connexion.invalid) {
      return;
    }

    const { email, password, remember, type } = this.connexion.value;

    if (type === 'ADMIN') {
      // Login admin
      this.connexionService.login1(email, password).subscribe({
        next: (admin) => {
          // Stocke dans localStorage sous une clé commune
          localStorage.setItem('currentUser', JSON.stringify({
            type: 'ADMIN',
            data: admin
          }));

          if (remember) {
            localStorage.setItem('remember', 'true');
          }

          // Redirection
          this.router.navigate(['/admin/dashboard']);
        },
        error: () => {
          this.erreur = 'Email ou mot de passe incorrect';
        }
      });
    } else {
      // Login utilisateur
      this.connexionService.login(email, password).subscribe({
        next: (user) => {
          localStorage.setItem('currentUser', JSON.stringify({
            type: 'USER',
            data: user
          }));

          if (remember) {
            localStorage.setItem('remember', 'true');
          }

          this.router.navigate(['/dashboard-user']);
        },
        error: () => {
          this.erreur = 'Email ou mot de passe incorrect';
        }
      });
    }
  }
}
