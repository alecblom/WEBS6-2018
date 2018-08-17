import { Time } from "@angular/common";
import { Participant } from "./participant.model";

export class Match {
    uid: string;
    startTime: Date;
    round: number;
    participants: Array<Participant>;
}