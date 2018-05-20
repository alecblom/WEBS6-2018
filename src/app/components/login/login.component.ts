import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { User } from '@firebase/auth-types';
import { IfObservable } from 'rxjs/observable/IfObservable';
import { Observable, of } from 'rxjs';
import * as firebase from 'firebase/app';
import { AuthService } from '../../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private auth: AuthService) { }

  ngOnInit() {
  }
  login() {
    this.auth.googleLogin();
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
