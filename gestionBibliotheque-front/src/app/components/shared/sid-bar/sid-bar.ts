import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';

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

  constructor(@Inject(PLATFORM_ID) private platformId: Object,private router : Router) {}

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
   allerDashboard(): void {
     if(this.user.role==='ADMIN'){
       this.router.navigate(['/admin/dashboard'])
       }
     else{
       this.router.navigate(['/dashboard-user'])
       }
      }
   allerLivre(): void {
     if(this.user.role==='ADMIN'){
       this.router.navigate(['/book-list'])
       }
     else{
       this.router.navigate(['/rechercher-livre'])
       }
      }
   allerEmprunt(): void {
     if(this.user.role==='ADMIN'){
       this.router.navigate(['/emprunt-page'])
       }
     else{
       this.router.navigate(['/emprunt-form'])
       }
      }

    allerAuteur(): void {
      if(this.user.role==='ADMIN'){
             this.router.navigate(['/auteur'])
      }
    }
    allerCathegorie(): void {
      if(this.user.role==='ADMIN'){
             this.router.navigate(['/categorie'])
      }
    }
    allerEditeur(): void {
      if(this.user.role==='ADMIN'){
             this.router.navigate(['/editeur'])
      }
    }
  logout(): void {
      localStorage.clear();
      this.router.navigate(['/connexion']);
    }
}
