import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Step1Component } from './step1/step1.component';
import { Step2Component } from './step2/step2.component';
import { Step3Component } from './step3/step3.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BoardtutorialComponent } from './boardtutorial/boardtutorial.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotComponent } from './forgot/forgot.component';
import { Rp2040Component } from './rp2040/rp2040.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    NotfoundComponent,
    SidebarComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    LoginComponent,
    SignupComponent,
    ForgotComponent,
    BoardtutorialComponent,
    Rp2040Component,
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
   

  ],
  providers: [
    provideAnimationsAsync()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
