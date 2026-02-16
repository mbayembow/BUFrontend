import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EditeurService } from '../../services/editeur';

@Component({
  selector: 'app-editeur',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editeur.html',
  styleUrls: ['./editeur.css']
})
export class EditeurComponent implements OnInit {

  editeurs: any[] = [];
  isEditMode = false;

  editeur: any = {
    idEditeur: null,
    nom: '',
    date: ''
  };

  constructor(private editeurService: EditeurService) {}

  ngOnInit(): void {
    this.loadEditeurs();
  }

  loadEditeurs(): void {
    this.editeurService.getAll().subscribe((data: any[]) => {
      this.editeurs = data;
    });
  }

  save(): void {
    if (this.isEditMode) {
      this.editeurService.update(this.editeur.idEditeur, this.editeur)
        .subscribe(() => {
          this.reset();
          this.loadEditeurs();
        });
    } else {
      this.editeurService.add(this.editeur)
        .subscribe(() => {
          this.reset();
          this.loadEditeurs();
        });
    }
  }

  edit(ed: any): void {
    this.editeur = { ...ed };
    this.isEditMode = true;
  }

  delete(id: number): void {
    if (confirm('Supprimer cet éditeur ?')) {
      this.editeurService.delete(id).subscribe(() => {
        this.loadEditeurs();
      });
    }
  }

  reset(): void {
    this.editeur = {
      idEditeur: null,
      nom: '',
      date: ''
    };
    this.isEditMode = false;
  }
}
