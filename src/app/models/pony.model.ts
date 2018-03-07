export class PonyModel {
    id: number;
    name: string;
    color: string;
}

export class PonyWithPositionModel extends PonyModel {
    position: number;
}
