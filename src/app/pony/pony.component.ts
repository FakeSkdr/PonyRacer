import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PonyModel } from '../models/pony.model';

@Component({
  selector: 'pr-pony',
  templateUrl: './pony.component.html',
  styleUrls: ['./pony.component.css']
})
export class PonyComponent implements OnInit {

  @Input()
  ponyModel: PonyModel;

  @Input()
  isRunning: Boolean;

  @Output()
  ponyClicked = new EventEmitter<PonyModel>();

  constructor() { }

  ngOnInit() {
  }

  getPonyImageUrl(): string {
    let name = `pony-${this.ponyModel.color.toLowerCase()}`;
    if (this.isRunning) {
      name += '-running';
    }
    return `assets/images/${name}.gif`;
  }

  clicked(): void {
    this.ponyClicked.emit(this.ponyModel);
  }
}
