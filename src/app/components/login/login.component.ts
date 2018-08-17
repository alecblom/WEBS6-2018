import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private afAuth: AngularFireAuth, private afStore: AngularFirestore, private auth: AuthService, private router: Router) { }

  ngOnInit() {
  }
  login() {
    this.auth.googleLogin().then(
      res => this.router.navigate(['/competitions'])
    );
  }
  logout() {
    this.afAuth.auth.signOut();
  }
}
