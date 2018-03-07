import { Component, OnInit } from '@angular/core';
import { RaceModel } from '../models/race.model';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';

@Component({
  selector: 'pr-bet',
  templateUrl: './bet.component.html',
  styleUrls: ['./bet.component.css']
})
export class BetComponent implements OnInit {

  raceModel: RaceModel;

  betFailed: Boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private raceService: RaceService ) { }

  ngOnInit() {
    const raceId = this.activatedRoute.snapshot.paramMap.get('raceId');
    this.raceService.get(raceId).subscribe(r => this.raceModel = r);
  }

  betOnPony(pony) {
    this.raceService.bet(this.raceModel.id, pony.id).subscribe(r => {
      this.raceModel = r;
      this.betFailed = false;
    },
    error => {
      this.betFailed = true;
    });
  }

  isPonySelected(pony) {
    return this.raceModel.betPonyId === pony.id;
  }
}
