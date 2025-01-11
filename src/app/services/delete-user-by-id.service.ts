import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteUserByIdService {

  url = "https://localhost:7022/api/User/deleteById";

  constructor() { }

  async deleteUserById(data: string){
    try {
      const userToken = sessionStorage.getItem('authToken');

      const response = await fetch(this.url, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: data
      });

      return await response.json();
    } catch (error) {
      console.error('Delete-user-by-id error: ', error);
      throw error;
    }
  }
}
