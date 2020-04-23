import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isLoggedOut: boolean;
  currentUser: User;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.authService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    if (this.isLoggedIn$) {
      this.isLoggedOut = false;
    } else {
      this.isLoggedOut = true;
    }

  }

  logout() {
    this.authService.logout();
  }
}
