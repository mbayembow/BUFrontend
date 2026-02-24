export enum Status {
  Disponible = 'Disponible',
  NonDisponible = 'NonDisponible'
}

export interface Livre {
  idLivre?: number;
  titre: string;
  reference?: string;
  isbn?: string;
  quantite: number;
  stock?: number;
  imageUrl?: string;
  status: Status;
  idAuteur: number;  // L'ID seulement
  idCategorie?: number;
  idEditeur?: number;
  idPersonnel?: number;
}
