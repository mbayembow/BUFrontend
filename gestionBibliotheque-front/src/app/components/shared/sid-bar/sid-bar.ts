import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-sid-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sid-bar.html',
  styleUrls: ['./sid-bar.css'],
})
export class SidBar implements OnInit {
  isCollapsed: boolean = false;
  nom: string = 'Mbaye';
  user: any;
  userInitials: string = '';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const data = localStorage.getItem('currentUser');
      if (data) {
        const currentUser = JSON.parse(data);
        if (currentUser.type === 'ADMIN') {
          this.user = currentUser.data;
        } else {
          this.user = currentUser.data;
        }

        this.userInitials =
          // (this.user.prenom?.[0] || this.user.nom?.[0] || '').toUpperCase() +
          (this.user.nom?.[0] || '').toUpperCase();
      }
    }
  }

  // Toggle sidebar
  toggleSidebar(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
