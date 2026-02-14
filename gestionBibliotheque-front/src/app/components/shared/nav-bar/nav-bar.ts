import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {

  user: any = null;
  userInitials = '';
  displayName = '';

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

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
          (this.user.prenom?.[0] || this.user.nom?.[0] || '').toUpperCase() +
          (this.user.nom?.[0] || '').toUpperCase();
      }
    }
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/connexion']);
  }
}
