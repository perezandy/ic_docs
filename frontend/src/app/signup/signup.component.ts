import { Component } from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import { passwordMatchValidator} from './signup.validator';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-signup',
  styleUrls: ['./signup.component.css'],
  templateUrl: './signup.component.html',
})
export class SignupComponent {
 
  isLoading = false;
  isSuccess = false;
  isError = false;
  errorMessage = '';


  
  public signupForm : FormGroup = new FormGroup({
    'userControl' : new FormControl('',[Validators.required]),
    'emailControl' : new FormControl('', [Validators.required, Validators.email]),
    'passwordControl' : new FormControl('' , [Validators.required]),
    'confirmPasswordControl' : new FormControl('',[Validators.required] )  
  }, { validators: passwordMatchValidator });

  constructor() {
    // Add event listeners to clear messages on input
    const userControl = this.signupForm.get('userControl');
    if (userControl) {
      userControl.valueChanges.subscribe(() => this.clearMessages());
    }
  
    const emailControl = this.signupForm.get('emailControl');
    if (emailControl) {
      emailControl.valueChanges.subscribe(() => this.clearMessages());
    }
  
    const passwordControl = this.signupForm.get('passwordControl');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(() => this.clearMessages());
    }
  
    const confirmPasswordControl = this.signupForm.get('confirmPasswordControl');
    if (confirmPasswordControl) {
      confirmPasswordControl.valueChanges.subscribe(() => this.clearMessages());
    }
  }




  email: string = "";
  username: string = "";
  password: string = "";
  passwordconfirm: string = "";
  show: boolean = false;


  
  submit(){
    this.isLoading = true;
    fetch('http://localhost:3000/signup', { // TODO: Replace with URL of API signup() function
      headers: {
        'content-type': ' application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        email: this.email,
        username: this.username,
        password: this.password
      }),
    })
      .then((res) => {
        if(res.status != 200){
          this.isLoading = false;
          this.isError = true;
          console.log("FAILED SIGNUP");
        }
        else{
          console.log(res);
          console.log("SUCCESSFUL SIGNUP");
          this.isLoading = false;
          this.isSuccess = true;
  
        }
        console.log(res);
       
      })
      .catch((err) => {
        this.isLoading = false;
        this.isError = true;
      });      
  }
  checkEmail(){
    const emailControl = this.signupForm.get('emailControl');
    if (emailControl == null){
      return '';
    }
    if(emailControl.hasError('required')) {
      return 'You must enter a value';
    }

    return emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  submissionNotReady() : boolean {
    const hasErrors = Object.values(this.signupForm.controls).some(control => control.errors !== null);
    if(this.signupForm.errors?.['passwordMismatch']){
      return true;
    }
    if(hasErrors){
      return true;
    }
    return false;
  }

  clear() {
    this.username = "";
    this.password = "";
    this.passwordconfirm = "";
    this.show = true;
     
    this.isLoading = false;
    this.isSuccess = false;
    this.isError = false;
  }
  clearMessages(){
    this.isSuccess = false;
    this.isError = false;
  }
}



