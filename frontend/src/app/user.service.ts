import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

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