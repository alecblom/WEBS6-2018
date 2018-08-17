import { Competition } from "./competition.model";
import { Poule } from "./poule.model";

export class PouleCompetition extends Competition {
    poules: Array<Poule>
}