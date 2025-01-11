import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignInService {

  url = "https://localhost:7022/api/User/login";

  constructor() { }

  async signInUser(data: JSON){
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
      console.error('Sign-in error: ', error);
      throw error;
    }
  }
}
