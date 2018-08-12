import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService,
    private afAuth: AngularFireAuth,
    private afStore: AngularFirestore) { }

    getUser(userId: string): Promise<any> {
      const userRef: AngularFirestoreDocument<any>  = this.afStore.doc(`users/${userId}`);
      return userRef.ref.get(null).then(collections => {
         return collections.data();
      });
    }

}
