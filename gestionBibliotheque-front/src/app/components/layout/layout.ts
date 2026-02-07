import { Component } from '@angular/core';
import {NavBar} from '../shared/nav-bar/nav-bar';
import {SidBar} from '../shared/sid-bar/sid-bar';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [
    NavBar,
    SidBar,
    RouterOutlet
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {

}
