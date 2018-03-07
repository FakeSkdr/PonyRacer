import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { Injectable, OnInit } from '@angular/core';
import { RaceModel } from './models/race.model';
import { environment } from '../environments/environment';

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

  get(id: number | string): Observable<RaceModel>  {
    return this.http.get<RaceModel>(`${this.baseUrl}/${id}`);
  }
}
