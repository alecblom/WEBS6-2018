import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { UUID } from 'angular2-uuid';

interface Competition {
  id: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) { 

  }

  createCompetition(competitionType: string): Promise<any> {
      const newId = UUID.UUID();
      const competitionsRef: AngularFirestoreDocument<any> = this.afStore.doc(`competitions/${newId}`);
  
      const data: Competition = {
        id: newId,
        type: competitionType
      }
      return competitionsRef.set(data, { merge: true }).then(
        res => { return newId; }
      );
  
  }

  getCompetition(competitionId: string): Promise<any> {
    const competitionsRef: AngularFirestoreDocument<any>  = this.afStore.doc(`competitions/${competitionId}`);
    return competitionsRef.ref.get(null).then(collections => {
       return collections.data();
    });
  }
}
