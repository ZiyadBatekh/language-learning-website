import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import { JwtService } from "./jwt.service";
import { map, distinctUntilChanged, tap, shareReplay } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { LoginResponseDto, User } from "../user.model";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private readonly http: HttpClient,
    private readonly jwtService: JwtService,
    private readonly router: Router,
  ) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ user: User }> {
    return this.http
      .post<LoginResponseDto>("/auth/email/login", { user: credentials })
      .pipe(tap(({ user, token }) => this.setAuth(user, token)));
  }

  register(credentials: {
    firstName: string;
    lastName:string;
  }): Observable<any> {
    return this.http
      .post<{ user: User }>("/auth/email/register", { user: credentials })
      .pipe(user => {
        return user
      } ) 
  }

  logout(): void {
    this.purgeAuth();
    void this.router.navigate(["/"]);
  }

  getCurrentUser(token:string): Observable<{ user: User }> {
    return this.http.get<{ user: User }>("/auth/me").pipe(
      tap({
        next: ({ user }) => this.setAuth(user,token),
        error: () => this.purgeAuth(),
      }),
      shareReplay(1),
    );
  }

  update(user: Partial<User>): Observable<{ user: User }> {
    return this.http.put<{ user: User }>("/user", { user }).pipe(
      tap(({ user }) => {
        this.currentUserSubject.next(user);
      }),
    );
  }

  setAuth(user: User , token:string): void {
    if(token) this.jwtService.saveToken(token);
    this.currentUserSubject.next(user);


  }

  purgeAuth(): void {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }
}
