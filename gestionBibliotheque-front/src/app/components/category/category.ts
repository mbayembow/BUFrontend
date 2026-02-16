import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

interface Category {
  idCategorie: number;
  nom: string;
  description?: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent implements OnInit {

  categories: Category[] = [];
  isEditMode = false;
  selectedCategoryId!: number;

  private apiUrl = environment.apiUrl + '/categories';

  newCategory = {
    nom: '',
    description: ''
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  // 🔹 Récupération
  getAllCategories(): void {
    this.http.get<Category[]>(this.apiUrl).subscribe(data => {
      this.categories = data;
    });
  }

  // 🔹 Ajout
  addCategory(): void {
    if (!this.newCategory.nom) return;

    this.http.post<Category>(this.apiUrl, this.newCategory)
      .subscribe(cat => {
        this.categories.push(cat);
        this.resetForm();
      });
  }

  // 🔹 Préparer modification
  editCategory(cat: Category): void {
    this.newCategory = {
      nom: cat.nom,
      description: cat.description ?? ''
    };
    this.selectedCategoryId = cat.idCategorie;
    this.isEditMode = true;
  }

  // 🔹 Mise à jour
  updateCategory(): void {
    this.http.put<Category>(
      `${this.apiUrl}/${this.selectedCategoryId}`,
      this.newCategory
    ).subscribe(() => {
      this.getAllCategories();
      this.resetForm();
    });
  }

  // 🔹 Suppression
  deleteCategory(id: number): void {
    this.http.delete(`${this.apiUrl}/${id}`)
      .subscribe(() => {
        this.categories = this.categories.filter(c => c.idCategorie !== id);
      });
  }

  // 🔹 Reset
  resetForm(): void {
    this.newCategory = { nom: '', description: '' };
    this.isEditMode = false;
    this.selectedCategoryId = 0;
  }
}
