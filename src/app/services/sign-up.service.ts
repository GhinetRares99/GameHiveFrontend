import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  url = "https://localhost:7022/api/User/register";

  constructor() { }

  async signUpUser(data: User){
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      return response;
    } catch (error) {
      console.error('Sign-up error: ', error);
      throw error;
    }
  }
}
