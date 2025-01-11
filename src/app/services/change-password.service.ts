import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  url = "https://localhost:7022/api/User/recover";

  constructor() { }

  async changePassword(data: JSON){
    try {
      const userToken = sessionStorage.getItem('authToken');

      const response = await fetch(this.url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      return response;
    } catch (error) {
      console.error('Change-password error: ', error);
      throw error;
    }
  }
}
