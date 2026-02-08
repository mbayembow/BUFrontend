import { Routes } from '@angular/router';
import { Inscription } from './components/inscription/inscription';
import { Connexion } from './components/connexion/connexion';
import { Personne } from './components/personne/personne';
import { Personnel} from './components/personnel/personnel';
import { Utilisateur } from './components/utilisateur/utilisateur';
import {EmpruntFormComponent} from './components/emprunt-form/emprunt-form';
import {Home} from './components/dashboard/home';
import { BookComponent } from './components/book/book';
import { AuteurComponent } from './components/auteur/auteur';
import { CategoryComponent } from './components/category/category';

export const routes: Routes = [
  {path:'inscription', component: Inscription},
  {path:'connexion', component: Connexion},
  {path:'personne', component: Personne},
  {path:'personnel', component: Personnel},
  {path:'utilisateur', component: Utilisateur},
  {path:'emprunt-form',component:EmpruntFormComponent},
  {path:'dashboard',component: Home},
  {path:'book',component: BookComponent},
  {path:'auteur',component: AuteurComponent},
  {path:'categorie',component: CategoryComponent},


  ];

