import { Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription';
import { ConnexionComponent } from './components/connexion/connexion';
import { EmpruntFormComponent } from './components/emprunt-form/emprunt-form';
import { BookComponent } from './components/book/book';
import { AuteurComponent } from './components/auteur/auteur';
import { CategoryComponent } from './components/category/category';
import { EmpruntListComponent } from './components/emprunt-list/emprunt-list';
import { Layout } from './components/layout/layout';
import { EmpruntPageComponent } from './components/emprunt-page/emprunt-page';
import { AllEmprunt } from './components/all-emprunt/all-emprunt';
import { DashboardAdmin } from './components/dashboard-admin/dashboard-admin';
import { DashboardUser } from './components/dashboard-user/dashboard-user';
import { RechercherLivre } from './components/rechercher-livre/rechercher-livre';
import { EditeurComponent } from './components/editeur/editeur';
import { EcrireComponent } from './components/ecrire/ecrire';
import { BookListComponent } from './components/book-list/book-list';

export const routes: Routes = [

  // Pages publiques
  { path: '', redirectTo: 'inscription', pathMatch: 'full' },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'connexion', component: ConnexionComponent },

  // Layout principal (dashboard + sidebar)
  {
    path: '',
    component: Layout,
    children: [
      { path: 'dashboard-user', component: DashboardUser },
      { path: 'book', component: BookComponent },
      { path: 'book-list',component: BookListComponent},
      { path: 'auteur', component: AuteurComponent },
      { path: 'categorie', component: CategoryComponent },
      { path: 'emprunt-form', component: EmpruntFormComponent },
      { path: 'emprunt-list', component: EmpruntListComponent },
      { path: 'emprunt-page', component: EmpruntPageComponent },
      { path: 'all-emprunt', component: AllEmprunt },
      {path:'editeur',component: EditeurComponent},
      {path:'ecrire',component: EcrireComponent},
      { path: 'rechercher-livre', component: RechercherLivre },

      // Admin routes
      { path: 'admin/dashboard', component: DashboardAdmin },
//       {path:'personnel', component: Personnel}
    ]
  }
];
