import { RacePhaseModel } from '../RefData/racePhase.type';
import { RaceFormatModel } from '../RefData/raceFormat.type';
import { LocationModel } from '../Locations/location.type';
import { SeasonModel } from '../Seasons/season.type';

export class RaceEventModel {

    id: string;
    runCount: number;
    notes: string;
    raceName: string;
    scheduledStartTime: Date;

    season: SeasonModel;
    location: LocationModel;
    raceFormat: RaceFormatModel;
    racePhase: RacePhaseModel;

}