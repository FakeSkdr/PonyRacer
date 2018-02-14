import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/do';

import { UserModel } from './models/user.model';

@Injectable()
export class UserService {
  baseUrl = 'http://ponyracer.ninja-squad.com/api/users';

  public userEvents: Subject<UserModel> = new Subject<UserModel>();

  constructor(private http: HttpClient) { }

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
      .do(user => this.userEvents.next(user as UserModel));
  }
}
