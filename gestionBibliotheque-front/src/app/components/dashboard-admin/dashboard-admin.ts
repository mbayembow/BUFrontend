import { Component, OnInit ,Inject,PLATFORM_ID} from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book';
import { EmpruntService } from '../../services/emprunt';
import { InscriptionService } from '../../services/inscription-service';
import { CommonModule, DatePipe, isPlatformBrowser, NgClass } from '@angular/common';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-admin.html',
  styleUrls: ['./dashboard-admin.css'],
})
export class DashboardAdmin implements OnInit {
  user: any = null;
  userInitials: string = '';
  idUtilisateur: number = 0;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private bookService: BookService ,
    private empruntService:EmpruntService,
    private inscriptionService: InscriptionService
    ) {}

  empruntsTotal: number = 0;
  livreTotal: number = 0;
  nombreUtilisateurs: number = 0;

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
          const data = localStorage.getItem('currentUser');

          if (data) {
            const currentUser = JSON.parse(data);
            this.user = currentUser.data;
            this.idUtilisateur = this.user?.idUtilisateur || 0;

            const prenomInitial = this.user.prenom?.[0] || '';
            const nomInitial = this.user.nom?.[0] || '';
            this.userInitials = (prenomInitial + nomInitial).toUpperCase();

          }
        }

     this.loadLivreTotal();
     this.loadEmpruntTotal();
     this.getTotalUtilisateurs();

  }

   loadLivreTotal(): void {
      this.bookService.getAllBooks().subscribe({
        next: (data) => {
          this.livreTotal = data.length; // nombre de livres
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
   loadEmpruntTotal(): void {
      this.empruntService.getTous().subscribe({
        next: (data) => {
          this.empruntsTotal = data.length; // nombre de livres
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

    getTotalUtilisateurs(): void {
        this.inscriptionService.listUser().subscribe({
          next: (data: any[]) => {
            this.nombreUtilisateurs = data.length;
          },
          error: (err: any) => console.error('Erreur utilisateurs', err)
        });
      }

  // ================= ACTIONS RAPIDES =================
  ajouterLivre(): void {
    this.router.navigate(['/book'])
    }

  gererLivre(): void {
    this.router.navigate(['/book-list']);
  }

  gererMembres(): void {
    this.router.navigate(['/membres']);
  }



  gererEmprunt(): void {
    this.router.navigate(['/emprunt-page']);
  }

//   deconnexion(): void {
//     this.router.navigate(['/login']);
//   }

}
