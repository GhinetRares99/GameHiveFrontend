import { Injectable } from '@angular/core';
import { User } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  url = "https://localhost:7022/api/User/update";

  constructor() { }

  async updateUser(data: User)
  {
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
      console.error('Update-user error: ', error);
      throw error;
    }
  }
}
