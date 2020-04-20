import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getallUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/api/v1/users/users`);
  }
}
