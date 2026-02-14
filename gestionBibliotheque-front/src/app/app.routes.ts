import { Routes } from '@angular/router';
import { InscriptionComponent} from './components/inscription/inscription';
import { ConnexionComponent } from './components/connexion/connexion';
import { Personne } from './components/personne/personne';
import { Personnel} from './components/personnel/personnel';
import { Utilisateur } from './components/utilisateur/utilisateur';
import {EmpruntFormComponent} from './components/emprunt-form/emprunt-form';
import {EmpruntListComponent} from './components/emprunt-list/emprunt-list';
import {Layout} from './components/layout/layout';
import {EmpruntPageComponent} from './components/emprunt-page/emprunt-page';
import {ALL} from 'node:dns';
import {AllEmprunt} from './components/all-emprunt/all-emprunt';
import {DashboardAdmin} from './components/dashboard-admin/dashboard-admin';
import {DashboardUser} from './components/dashboard-user/dashboard-user';

export const routes: Routes = [
  { path: '', redirectTo: 'inscription', pathMatch: 'full' },
  {path: 'inscription', component: InscriptionComponent},
  {path: 'connexion', component: ConnexionComponent},
  {
    path: '',component:Layout,
      children: [


          {path: 'personne', component: Personne},
          {path: 'personnel', component: Personnel},
          {path: 'utilisateur', component: Utilisateur},
          {path: 'emprunt-form', component: EmpruntFormComponent},
          {path: 'emprunt-list', component: EmpruntListComponent},
          {path: 'dashboard-user', component: DashboardUser},
          {path:'admin/dashboard',component: DashboardAdmin},
          {path:'emprunt-page',component:EmpruntPageComponent},
          {path:'all-emprunt',component: AllEmprunt}
      ]
    }
    ];

