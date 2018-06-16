import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { UUID } from 'angular2-uuid';
import { Competition } from '../../models/competition.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) { 

  }

  createCompetition(data: Array<any>): Promise<any> {
      const newId = UUID.UUID();
      const competitionsRef: AngularFirestoreDocument<any> = this.afStore.doc(`competitions/${newId}`);
  
      const competition: Competition = {
        uid: newId,
        name: data["name"],
        startDate: data["startDate"],
        type: data["type"],
        ownerId: data["ownerId"],
        maxParticipants: data["maxParticipants"],
        matchTime: data["matchTime"],
        participants: data["participants"],
        matches: data["matches"]
      }
      return competitionsRef.set(competition, { merge: true }).then(
        res => { return newId; }
      );
  }

  getCompetitions(): Observable<any[]> {
    return this.afStore.collection(`competitions`).valueChanges();
  }

  getCompetition(competitionId: string): Promise<any> {
    const competitionsRef: AngularFirestoreDocument<any>  = this.afStore.doc(`competitions/${competitionId}`);
    return competitionsRef.ref.get(null).then(collections => {
       return collections.data();
    });
  }
}