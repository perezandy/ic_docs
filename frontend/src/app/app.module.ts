import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Step1Component } from './projecttutorial/step1/step1.component';
import { Step2Component } from './projecttutorial/step2/step2.component';
import { Step3Component } from './projecttutorial/step3/step3.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BoardtutorialComponent } from './boardtutorial/boardtutorial.component';
import { LoginComponent } from './authentication/login/login.component';
import { SignupComponent } from './authentication/signup/signup.component';
import { ForgotComponent } from './authentication/forgot/forgot.component';
import { Rp2040Component } from './rp2040/rp2040.component';
import { ForumsComponent } from './forums/forums.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MessageComponent } from './forums/message/message.component';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { TimePipe } from './time.pipe';


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
    ForumsComponent,
    MessageComponent,
    TimePipe,

  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinner


  ],
  providers: [
    DatePipe,
    provideAnimationsAsync()
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
