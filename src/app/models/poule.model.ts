import { Participant } from "./participant.model";
import { Round } from "./round.model";

export class Poule {
    uid: string;
    participants: Array<Participant>;
    rounds?: Array<Round>;
}