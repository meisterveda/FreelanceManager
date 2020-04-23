import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { User } from 'src/app/_models/user';
import { UserRole } from 'src/app/_models/user-role.enum';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  currentUser : User;

  constructor(
    private authService: AuthService
  ) {
    this.authService.currentUser.subscribe(x => this.currentUser = x);
   }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    /* let currentUser = this.authService.currentUserValue;
    if (currentUser && currentUser.token) {
      this.isLogged = this.authService.loggedIn();
      return this.isLogged;
    } */
  }

}
