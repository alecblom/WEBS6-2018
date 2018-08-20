import { Match } from "./match.model";
import { Participant } from "./participant.model";
import { Round } from "./round.model";
import { Poule } from "./poule.model";

export class Competition {
    uid: string;
    name:string;
    startDate: Date;
    type: string;
    ownerId: string;
    hasStarted: boolean;
    maxParticipants: number;
    matchTime: string;
    rounds: Array<Round>;
    poules?: Array<Poule>;
}

