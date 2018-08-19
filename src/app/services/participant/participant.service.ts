import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Participant } from '../../models/participant.model';

@Injectable({
  providedIn: 'root'
})
export class ParticipantService {

  constructor(
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) { }
    
    createParticipant(data: Array<any>, competitionId: string): Promise<any> {
      const participantsRef: AngularFirestoreDocument<any> = this.afStore.doc(`participants/${data["uid"]}`)
      let participant: Participant;
      if(data["pouleId"]){
         participant = {
          uid: data["uid"],
          userId: data["userId"],
          pouleId: data["pouleId"],
          competitionId: competitionId,
          name: data["name"],
          points: 0
        }
      }
      else{
        participant = {
          uid: data["uid"],
          userId: data["userId"],
          competitionId: competitionId,
          name: data["name"],
          points: 0
        }
      }
  
      return participantsRef.set(participant, { merge: true }).then(
        res => { return data["uid"] }
      )
    }
  getParticipants(): Observable<any[]> {
    return this.afStore.collection(`participants`).valueChanges()
  }

  getParticipant(participantId: string): Observable<any> {
    return this.afStore.doc(`participants/${participantId}`).valueChanges()
  }
  
  updateParticipant(participant: Participant){
    this.afStore.doc<Participant>(`participants/${participant.uid}`).update(participant)
    console.log("Updated participant:")
    console.log(participant)
  }

  deleteParticipant(participant: Participant) {
    this.afStore.doc<Participant>(`competitions/${participant.uid}`).delete()
  }
}
