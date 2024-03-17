import { Component } from '@angular/core';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
 
  getUser() : string {
  const token = localStorage.getItem('token');

  if(token === null){
    return 'Guest';
  }
  
  const payload = token.split('.')[1];
  const decodedPayload = atob(payload);

  const JSONpayload = JSON.parse(decodedPayload);

  return JSONpayload.username;

 }


}
