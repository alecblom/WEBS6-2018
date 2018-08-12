import { User } from "./user.model";
import { Time } from "@angular/common";

export class Match {
    uid: string;
    startTime: Time;
    round: number;
    participants: Array<User>;
}