export interface Emprunt {
  idEmprunt: number;
  utilisateur?: {
    id: number;
    nom: string;
  };
  livre?: {
    id: number;
    titre: string;
  };
  statut?: string; // "EN_ATTENTE", "VALIDÉ", "EN_RETARD"
}
