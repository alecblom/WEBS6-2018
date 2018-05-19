import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';


import { AppComponent } from './app.component';
import { AuthService } from './core/auth.service';
import { AppRoutingModule, rootRouterConfig } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AuthGuard } from './core/auth.guard';


@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    CoreModule,
  ],
  providers: [AuthService, AuthGuard, AppRoutingModule],
  bootstrap: [AppComponent]
})
export class AppModule {    
  constructor() { }
}