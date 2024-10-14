import { NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from 'src/app/core/models/question.model';
import { LanguageService } from 'src/app/core/services/language.service';


@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ReactiveFormsModule, NgForOf],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  quizForm: FormGroup;
  questions :Question[] = [];
  currentQuestionIndex = 0;
  score = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.quizForm = this.fb.group({
      answer: ['', Validators.required],
    });
  }

  ngOnInit() {
    const language = this.route.snapshot.paramMap.get('language') || 'English';
    this.questions = this.languageService.getQuiz(language);
  }

  submitAnswer() {
    const selectedAnswer = this.quizForm.value.answer;
    const correctAnswer = this.questions[this.currentQuestionIndex].answer;

    if (selectedAnswer === correctAnswer) {
      this.score++;
    }

    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.quizForm.reset();
    } else {
      this.router.navigate(['/results'], { state: { score: this.score } });
    }
  }
}
