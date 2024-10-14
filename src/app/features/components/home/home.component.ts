import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  languages = ['English', 'Spanish'];

  constructor(private router: Router) {}

  startQuiz(language: string) {
    this.router.navigate(['/quiz', language]);
  }
}
