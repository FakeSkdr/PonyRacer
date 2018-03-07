import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/do';

import { UserModel } from './models/user.model';
import { environment } from '../environments/environment';
import { JwtInterceptorService } from './jwt-interceptor.service';

@Injectable()
export class UserService {
  baseUrl = `${environment.baseUrl}/api/users`;

  public userEvents: BehaviorSubject<UserModel> = new BehaviorSubject<UserModel>(undefined);

  constructor(private http: HttpClient, private jwtInterceptorService: JwtInterceptorService) {
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

  logout() {
    this.jwtInterceptorService.removeJwtToken();
    this.userEvents.next(null);
    window.localStorage.removeItem('rememberMe');
  }

  storeLoggedInUser(user) {
    this.jwtInterceptorService.setJwtToken(user.token);
    window.localStorage.setItem('rememberMe', JSON.stringify(user));
    this.userEvents.next(user as UserModel);
  }

  retrieveUser(): void {
    const json = window.localStorage.getItem('rememberMe');
    if (json) {
      const user = JSON.parse(json);
      this.jwtInterceptorService.setJwtToken(user.token);
      this.userEvents.next(user as UserModel);
    }
  }
}
