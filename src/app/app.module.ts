import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth/auth.service';
import { AppRoutingModule, rootRouterConfig } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AuthGuard } from './core/auth.guard';
import { UserComponent } from './components/user/user.component';
import { CompetitionListComponent } from './components/competition/list/list.component';
import { CompetitionDetailsComponent } from './components/competition/details/details.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CompetitionService } from './services/competition/competition.service';
import { FormsModule } from '@angular/forms';
import { CompetitionCreateComponent } from './components/competition/create/create.component';
import { MatchListComponent } from './components/match/list/list.component';
import { ParticipantListComponent } from './components/participant/list/list.component';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CompetitionListComponent,
    CompetitionDetailsComponent,
    UserComponent,
    CompetitionCreateComponent,
    MatchListComponent,
    ParticipantListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    CoreModule,
    FormsModule,
    MatTabsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthService, AuthGuard, AppRoutingModule, CompetitionService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() { }
}
