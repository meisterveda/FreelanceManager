import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    public jwtHelper: JwtHelperService
  ) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    //console.log(this.currentUser.role);
    console.log(this.isLogged);
    console.log(this.isAdmin);
  }

  get isLogged() {
    return this.currentUser && this.jwtHelper.isTokenExpired()
  }

  get isAdmin() {
    if (this.currentUser.role === 'admin') {
      return true
    }
    return false;
  }

  logout() {
    this.authService.logout();
  }
}
