import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  isAuthenticated(): boolean {
    // Implement your logic to check if the user is authenticated
    // This might involve checking a token in localStorage, a cookie, etc.
    return !!localStorage.getItem('authToken'); // Example implementation
  }
}
