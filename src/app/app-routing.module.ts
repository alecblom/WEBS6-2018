import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { CompetitionDetailsComponent } from './components/competition-details/competition-details.component';
import { CompetitionListComponent } from './components/competition-list/competition-list.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';


export const rootRouterConfig: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'competitions', component: CompetitionListComponent, canActivate: [AuthGuard] },
  { path: 'competition/:id', component: CompetitionDetailsComponent, canActivate: [AuthGuard]   }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(
      rootRouterConfig,
    )
  ],
  exports: [
    RouterModule
    
  ],
  declarations: [
  ]
})
export class AppRoutingModule { }