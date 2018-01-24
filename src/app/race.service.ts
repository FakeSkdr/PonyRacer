import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Injectable, OnInit } from '@angular/core';
import { RaceModel } from './models/race.model';

@Injectable()
export class RaceService {
  baseUrl = 'http://ponyracer.ninja-squad.com/api';

  constructor(private http: HttpClient) { }

  list(): Observable<RaceModel[]> {
    const params = {
      status: 'PENDING'
    };

    return this.http.get<RaceModel[]>(`${this.baseUrl}/races`, { params });
  }
}
