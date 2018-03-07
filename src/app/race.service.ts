import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

import { Injectable, OnInit } from '@angular/core';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';
import { PonyWithPositionModel, PonyModel } from './models/pony.model';

@Injectable()
export class RaceService {
  baseUrl = `${environment.baseUrl}/api/races`;

  constructor(private http: HttpClient) { }

  list(): Observable<RaceModel[]> {
    const params = {
      status: 'PENDING'
    };

    return this.http.get<RaceModel[]>(`${this.baseUrl}`, { params });
  }

  bet(raceId: number, ponyId: number): Observable<RaceModel> {
    return this.http.post<RaceModel>(`${this.baseUrl}/${raceId}/bets`, { ponyId });
  }

  cancelBet(raceId) {
    return this.http.delete<RaceModel>(`${this.baseUrl}/${raceId}/bets`);
  }

  get(id: number | string): Observable<RaceModel> {
    return this.http.get<RaceModel>(`${this.baseUrl}/${id}`);
  }

  live(raceId): Observable<PonyWithPositionModel[]> {
    return Observable
      .interval(1000)
      .take(101).map(position => {
        return [{
          id: 1,
          name: 'Superb Runner',
          color: 'BLUE',
          position
        }, {
          id: 2,
          name: 'Awesome Fridge',
          color: 'GREEN',
          position
        }, {
          id: 3,
          name: 'Great Bottle',
          color: 'ORANGE',
          position
        }, {
          id: 4,
          name: 'Little Flower',
          color: 'YELLOW',
          position
        }, {
          id: 5,
          name: 'Nice Rock',
          color: 'PURPLE',
          position
        }];
      });
  }
}
