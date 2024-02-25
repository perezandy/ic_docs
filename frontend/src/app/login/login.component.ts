import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';

/**
 * @title login demo
 */
@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html',
})
export class LoginComponent {

  username: string = '';
  password: string = '';
  show: boolean = false;
  isLoading = false;
  isSuccess = false;
  isError = false;
  
  public loginForm : FormGroup = new FormGroup({
    'userControl' : new FormControl('',[Validators.required]),
    'passwordControl' : new FormControl('' , [Validators.required])
  });

  constructor(private router: Router) {
    // Add event listeners to clear messages on input
    const userControl = this.loginForm.get('userControl');
    if (userControl) {
      userControl.valueChanges.subscribe(() => this.clearMessages());
    }  
    const passwordControl = this.loginForm.get('passwordControl');
    if (passwordControl) {
      passwordControl.valueChanges.subscribe(() => this.clearMessages());
    }
  }



  



  submit() {

      fetch('http://localhost:3000/login', { // TODO: Replace with URL of API login() function
      headers: {
        'content-type': ' application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        username: this.username,
        password: this.password,
      }),
    })
    .then((res) => {

    
      if(res.status == 401){
        console.log("Invalid Username or Password");
        this.isLoading = false;
        this.isError = true;

      }
      else if(res.status == 200){
        this.isLoading = false;
        this.isSuccess = true;
        console.log("Successful login");
      }
      else{
        console.log(res);
        //this.router.navigate([{ outlets: { home: ['home'] } }]);
       

      }
      
     
    })
    .catch((err) => {
      this.isLoading = false;
      this.isError = true;
      console.log(err);
      console.log("FAILED LOGIN");
    
    });

    this.clear();
  }
  clear() {
    this.username = '';
    this.password = '';
    this.show = true;
  }
  clearMessages(){
    this.isSuccess = false;
    this.isError = false;
    this.isLoading = false;
  }
}
