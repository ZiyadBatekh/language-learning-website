import { Routes } from "@angular/router";
import { HomeComponent } from "./features/components/home/home.component";
import { QuizComponent } from "./features/components/quiz/quiz.component";
import { ResultsComponent } from "./features/components/results/results.component";

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'quiz/:language', component: QuizComponent },
  { path: 'results', component: ResultsComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
  // Add other routes here
];