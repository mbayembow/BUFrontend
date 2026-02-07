import { Routes } from '@angular/router';
import { Inscription } from './components/inscription/inscription';
import { Connexion } from './components/connexion/connexion';
import { Personne } from './components/personne/personne';
import { Personnel} from './components/personnel/personnel';
import { Utilisateur } from './components/utilisateur/utilisateur';  

export const routes: Routes = [
  {path:'inscription', component: Inscription},
  {path:'connexion', component: Connexion},
  {path:'personne', component: Personne},
  {path:'personnel', component: Personnel},
  {path:'utilisateur', component: Utilisateur},

  ];

  