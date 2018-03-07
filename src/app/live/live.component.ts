import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RaceService } from '../race.service';
import { RaceModel } from '../models/race.model';
import { PonyWithPositionModel } from '../models/pony.model';
import { OnDestroy } from '@angular/core/src/metadata/lifecycle_hooks';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'pr-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.css']
})
export class LiveComponent implements OnInit, OnDestroy {
  positionSubscription: Subscription;

  raceModel: RaceModel;
  poniesWithPosition: Array<PonyWithPositionModel>;

  constructor(
    private raceService: RaceService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const raceId = this.activatedRoute.snapshot.paramMap.get('raceId');
    this.raceService.get(raceId).subscribe(r => {
      this.raceModel = r;
    });

    this.positionSubscription = this.raceService.live(raceId).subscribe(ponies => {
      this.poniesWithPosition = ponies;
    });
  }

  ngOnDestroy(): void {
    if (this.positionSubscription) {
      this.positionSubscription.unsubscribe();
    }
  }
}
