import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Emprunt} from '../../models/emprunt';

@Component({
  selector: 'app-emprunt-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './emprunt-list.html'
})
export class EmpruntListComponent {
  @Input() emprunts: Emprunt[] = [];
  @Output() valider = new EventEmitter<number>();
  @Output() refuser = new EventEmitter<number>();
  @Output() retourner = new EventEmitter<number>();
  @Output() supprimer = new EventEmitter<number>();
}
