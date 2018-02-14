import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  baseUrl = 'http://ponyracer.ninja-squad.com/api/users';

  public userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient) {
    this.retrieveUser();
  }

  register(login, password, birthYear): Observable<Object> {
    const params = {
      login,
      password,
      birthYear
    };

    return this.http.post(`${this.baseUrl}`, params);
  }

  authenticate(credentials): Observable<Object> {
    return this.http.post(`${this.baseUrl}/authentication`, credentials)
      .do(user => this.storeLoggedInUser(user));
  }

  storeLoggedInUser(user) {
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user as UserModel);
  }

  retrieveUser(): void {
    const json = window.localStorage.getItem('rememberMe');
    if (json) {
      const user = JSON.parse(json);
      this.userEvents.next(user as UserModel);
    }
  }
}
