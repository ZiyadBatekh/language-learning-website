import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-results',
  standalone: true,
  imports: [],
  templateUrl: './results.component.html',
  styleUrl: './results.component.css'
})
export class ResultsComponent {
  score: number;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    this.score = navigation?.extras.state?.['score'] || 0;
  }

  ngOnInit() {}

  resetQuiz() {
    this.router.navigate(['/home']);
  }
}
