export interface Emprunt {
  idEmprunt: number;
  dateDemande: string;
  dateEmprunt?: string;
  dateRetour?: string;
  statut?: 'En_attente' | 'Valide' | 'Refuse' | 'Retourne';

  utilisateur?: {
    id: number;
    nom: string;
    prenom: string;
    email?: string;
  };

  livre?: {
    id: number;
    titre: string;
    imageUrl?: string;
    auteur?: {
      nom: string;
      prenom: string;
    };
  };
}
