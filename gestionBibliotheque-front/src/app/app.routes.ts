import { Routes } from '@angular/router';
import { InscriptionComponent } from './components/inscription/inscription';
import { ConnexionComponent } from './components/connexion/connexion';
import { EmpruntFormComponent } from './components/emprunt-form/emprunt-form';
import { Home } from './components/dashboard/home';
import { BookComponent } from './components/book/book';
import { AuteurComponent } from './components/auteur/auteur';
import { CategoryComponent } from './components/category/category';
import { EmpruntListComponent } from './components/emprunt-list/emprunt-list';
import { Layout } from './components/layout/layout';
import { EmpruntPageComponent } from './components/emprunt-page/emprunt-page';
import { AllEmprunt } from './components/all-emprunt/all-emprunt';
import { DashboardAdmin } from './components/dashboard-admin/dashboard-admin';
import { DashboardUser } from './components/dashboard-user/dashboard-user';

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
      { path: 'dashboard', component: Home },
      { path: 'dashboard-user', component: DashboardUser },
      { path: 'book', component: BookComponent },
      { path: 'auteur', component: AuteurComponent },
      { path: 'categorie', component: CategoryComponent },
      { path: 'emprunt-form', component: EmpruntFormComponent },
      { path: 'emprunt-list', component: EmpruntListComponent },
      { path: 'emprunt-page', component: EmpruntPageComponent },
      { path: 'all-emprunt', component: AllEmprunt },
      {path:'editeur',component: EditeurComponent},
      {path:'ecrire',component: EcrireComponent},

      // Admin routes
      { path: 'admin/dashboard', component: DashboardAdmin }
    ]
  }
];
