import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserService {

  url = "https://localhost:7022/api/User/delete";

  constructor() { }
  
  async deleteUser(){
    try {
      const userToken = sessionStorage.getItem('authToken');

      const response = await fetch(this.url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Delete-user error: ', error);
      throw error;
    }
  }
}
