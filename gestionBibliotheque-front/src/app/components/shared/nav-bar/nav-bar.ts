import {Component, OnInit} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-nav-bar',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit{
nom: any;
ngOnInit() {
  this.nom = " Adama Diop"
}

  protected logout() {
    localStorage.clear();
    // this.router.navigate(['']);
  }
}
