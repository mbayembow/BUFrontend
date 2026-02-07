import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sid-bar',
  imports: [],
  templateUrl: './sid-bar.html',
  styleUrl: './sid-bar.css',
})
export class SidBar implements OnInit{
  nom : any;
    ngOnInit(): void {
        this.nom = "mbaye"
    }

}
