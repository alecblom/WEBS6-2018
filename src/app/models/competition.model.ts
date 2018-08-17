import { Match } from "./match.model";
import { Participant } from "./participant.model";
import { Round } from "./round.model";

export class Competition {
    uid: string;
    name:string;
    startDate: Date;
    type: string;
    ownerId: string;
    maxParticipants: number;
    matchTime: string;
    participants: Array<Participant>;
    rounds: Array<Round>;
    
    static addRound(competition: Competition, matches: Array<Match>) {
        const round: Round = {
            matches: matches
        }
        competition.rounds.push(round)
    }
}

