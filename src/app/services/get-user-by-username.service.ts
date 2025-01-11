import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserByUsernameService {

  url = "https://localhost:7022/api/User/getByUsername";

  constructor() { }

  async getUserByUsername(data: string)
  {
    try {
      const userToken = sessionStorage.getItem('authToken');

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: data
      });

      return await response.json();
    } catch (error) {
      console.error('Get-user-by-username error: ', error);
      throw error;
    }
  }
}
