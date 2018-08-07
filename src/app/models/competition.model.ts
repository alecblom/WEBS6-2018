import { User } from "./user.model";
import { Match } from "./match.model";

export class Competition {
    uid: string;
    name:string;
    startDate: Date;
    type: string;
    ownerId: string;
    maxParticipants: number;
    matchTime: number;
    participants: Array<User>;
    matches: Array<Match>;
}