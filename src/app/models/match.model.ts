import { Participant } from "./participant.model";

export class Match {
    uid: string;
    startTime: Date;
    round: number;
    winnerId?: string;
    participantIds: Array<string>;
}