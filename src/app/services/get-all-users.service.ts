import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {

  url = "https://localhost:7022/api/User/getAll";

  constructor() { }

  async getAllUsers()
  {
    try {
      const userToken = sessionStorage.getItem('authToken');

      const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Get-all-users error: ', error);
      throw error;
    }
  }
}
