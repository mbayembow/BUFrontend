import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css'], // ✅ styleUrls (pluriel)
})
export class Home {

  stats = {
    livres: 120,
    auteurs: 35,
    categories: 8,
    editeurs: 12
  };

}
