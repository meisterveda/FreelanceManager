import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../_models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  
  constructor(
    private http: HttpClient,
    public jwtHelper: JwtHelperService,
    private router: Router
    ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  get isLoggedIn() {
    if (this.jwtHelper.isTokenExpired()) {
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }
    return this.loggedIn.asObservable();
  }

  login(username: string, password: string) {

    return this.http.post<User>(`${environment.apiUrl}/api/v1/users/login`, { username, password })
        .pipe(map(user => {
          if (user['success'] && user['data'].token) {
              // Store user details and jwt token in local storage to keep user logged in between page refreshes
              localStorage.setItem('currentUser', JSON.stringify(user['data']));
              this.currentUserSubject.next(user);
              this.loggedIn.next(true);
          }
          return user;
        }));
  }

  logout() {
    // Make False that the person is loggedIn
    this.loggedIn.next(false);
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }


}