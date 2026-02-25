import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { App } from './app';

@NgModule({
  
  imports: [
    BrowserModule,
    CommonModule,
    ReactiveFormsModule,
    App,
    RouterModule
  ],
  providers: []
})
export class AppModule { }
