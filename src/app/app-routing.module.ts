import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';


export const rootRouterConfig: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserComponent, canActivate: [AuthGuard] }
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
    LoginComponent,
    RegisterComponent,
    UserComponent
  ]
})
export class AppRoutingModule { }