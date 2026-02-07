import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpruntService} from '../../services/emprunt';

@Component({
  selector: 'app-emprunt-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './emprunt-form.html'
})
export class EmpruntFormComponent {

  empruntForm: FormGroup;
  message = '';
  erreur = '';

  @Output() miseAJour = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private empruntService: EmpruntService) {
    this.empruntForm = this.fb.group({
      idUtilisateur: [null, [Validators.required, Validators.min(1)]],
      idLivre: [null, [Validators.required, Validators.min(1)]]
    });
  }

  enregistrer() {
    if (this.empruntForm.invalid) {
      this.erreur = "Veuillez remplir correctement tous les champs.";
      this.message = '';
      return;
    }

    const { idUtilisateur, idLivre } = this.empruntForm.value;

    this.empruntService.demanderEmprunt(idUtilisateur, idLivre).subscribe({
      next: (msg: string) => {
        this.message = msg;
        this.erreur = '';
        this.empruntForm.reset();
        this.miseAJour.emit(); // Notifie la liste
      },
      error: (err: { error: string; }) => {
        this.erreur = err.error || "Erreur lors de la création de l'emprunt.";
        this.message = '';
      }
    });
  }
}
