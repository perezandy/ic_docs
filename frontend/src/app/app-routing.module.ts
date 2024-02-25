import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule, Routes } from '@angular/router'; 
import { BrowserModule } from '@angular/platform-browser';
import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { BoardtutorialComponent } from './boardtutorial/boardtutorial.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

/* Custom Components */




const routes: Routes = [ 
  { 
    path: '', 
    redirectTo: '/login', 
    pathMatch: 'full' },
  {
    path: 'home',
    pathMatch : 'full',
    component: HomepageComponent,
  },
  { 
    path: 'project_tutorial', 
    component: Step1Component,
  },
  { 
    path: 'project_tutorial/step1', 
    component: Step1Component,
  },
  {
    path: 'project_tutorial/step2', 
    component: Step2Component,
  },
  {
    path: 'project_tutorial/step3', 
    component: Step3Component,
  },
  {
    path: 'board_tutorial',
    component: BoardtutorialComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    component: SignupComponent,
    path: 'signup',
  },
  { 
    path: '**', 
    component: NotfoundComponent,
  },
  
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,  { useHash: true }),

  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }