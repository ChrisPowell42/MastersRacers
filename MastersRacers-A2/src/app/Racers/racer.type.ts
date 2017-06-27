import { RaceSeriesModel } from '../RefData/raceSeries.type';

export class RacerModel {
    id: string;
    name: string;
    bibNumber: number;
    active: boolean;
    raceSeries: RaceSeriesModel;
}