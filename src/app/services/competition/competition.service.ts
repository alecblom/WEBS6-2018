import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UUID } from 'angular2-uuid';
import { Competition } from '../../models/competition.model';
import { Observable } from 'rxjs';
import { Participant } from '../../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) {

  }

  updateCompetition(competition: Competition): Promise<any> {
    console.log("Updated competition:")
    console.log(competition)
    return this.afStore.doc<Competition>(`competitions/${competition.uid}`).update(competition)
  }

  deleteCompetition(competition: Competition) {
    this.afStore.doc<Competition>(`competitions/${competition.uid}`).delete()
  }

  createCompetition(data: Array<any>): Promise<any> {
    const newId = UUID.UUID();
    const competitionsRef: AngularFirestoreDocument<any> = this.afStore.doc(`competitions/${newId}`);
    let competition: Competition

    if(data["type"] == "poule"){
      competition = {
        uid: newId,
        name: data["name"],
        startDate: data["startDate"],
        type: data["type"],
        hasStarted: data["hasStarted"],
        ownerId: data["ownerId"],
        maxParticipants: data["maxParticipants"],
        matchTime: data["matchTime"],
        rounds: data["rounds"],
        poules: data["poules"]
      }
    }
    else{
      competition = {
        uid: newId,
        name: data["name"],
        startDate: data["startDate"],
        type: data["type"],
        hasStarted: data["hasStarted"],
        ownerId: data["ownerId"],
        maxParticipants: data["maxParticipants"],
        matchTime: data["matchTime"],
        rounds: data["rounds"]
      };
    }
    return competitionsRef.set(competition, { merge: true }).then(
      res => { return newId; }
    );
  }

  getCompetitions(): Observable<any[]> {
    return this.afStore.collection(`competitions`).valueChanges();
  }

  getCompetition(competitionId: string): Observable<any> {
    return this.afStore.doc(`competitions/${competitionId}`).valueChanges()
  }
}