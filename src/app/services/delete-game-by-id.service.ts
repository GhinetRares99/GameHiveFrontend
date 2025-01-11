import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeleteGameByIdService {

  url = "https://localhost:7022/api/Game/delete";

  constructor() { }

  async deleteGameById(data: string){
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
      console.error('Delete-game-by-id error: ', error);
      throw error;
    }
  }
}
