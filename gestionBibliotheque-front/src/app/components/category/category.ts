import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.html',
  styleUrls: ['./category.css']
})
export class CategoryComponent {

  categories: any[] = [];
  isEditMode = false;
  selectedCategoryId!: number;

  newCategory: any = {
    name: ''
  };

  addCategory(): void {
    if (!this.newCategory.name) return;

    this.categories.push({
      id: Date.now(),
      name: this.newCategory.name
    });

    this.resetForm();
  }

  editCategory(cat: any): void {
    this.newCategory = { ...cat };
    this.selectedCategoryId = cat.id;
    this.isEditMode = true;
  }

  updateCategory(): void {
    const index = this.categories.findIndex(c => c.id === this.selectedCategoryId);
    if (index !== -1) {
      this.categories[index] = { ...this.newCategory };
    }
    this.resetForm();
  }

  deleteCategory(id: number): void {
    this.categories = this.categories.filter(c => c.id !== id);
  }

  resetForm(): void {
    this.newCategory = { name: '' };
    this.isEditMode = false;
  }
}
