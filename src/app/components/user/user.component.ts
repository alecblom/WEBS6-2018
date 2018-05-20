import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs';
import { AuthService } from '../../core/auth.service';
import { AuthGuard } from '../../core/auth.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  
  constructor(private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

}
