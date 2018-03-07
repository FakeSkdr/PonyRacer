import { PonyModel } from './pony.model';

export class RaceModel {
    id: number;
    name: string;
    startInstant: string;
    ponies: PonyModel[];
    betPonyId?: number;
}
