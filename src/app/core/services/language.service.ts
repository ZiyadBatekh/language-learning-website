import { Injectable } from '@angular/core';
import { Question } from '../models/question.model'; 

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private quizzes: { [key: string]: Question[] } = {
    English: [
      { question: 'What is the capital of England?', options: ['London', 'Paris'], answer: 'London' },
      { question: 'What is 2 + 2?', options: ['3', '4'], answer: '4' },
    ],
    Spanish: [
      { question: '¿Cuál es la capital de España?', options: ['Madrid', 'Barcelona'], answer: 'Madrid' },
      { question: '¿Qué significa "Hola"?', options: ['Hello', 'Goodbye'], answer: 'Hello' },
    ],
  };

  getQuiz(language: string): Question[] {
    return this.quizzes[language] || [];
  }
}
