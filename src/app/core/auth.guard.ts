import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { AuthService} from './auth.service'
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthGuard implements CanActivate {
  state: Observable<firebase.User>;
  constructor(private afAuth: AngularFireAuth, private auth: AuthService, private router: Router) {
    this.state = afAuth.authState;
  }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

      return this.auth.user
           .take(1)
           .map(user => !!user)
           .do(user => {
            if (user == null) {
              console.log('access denied')
              this.router.navigateByUrl('login');
              return true;
            }
            console.log('approved')
            return true;
        })
  }
}