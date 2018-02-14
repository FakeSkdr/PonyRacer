import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService {
  baseUrl = 'http://ponyracer.ninja-squad.com/api/users';

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
    return this.http.post(`${this.baseUrl}/authentication`, credentials);
  }
}
