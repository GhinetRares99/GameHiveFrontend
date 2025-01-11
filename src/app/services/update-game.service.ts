import { Injectable } from '@angular/core';
import { Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UpdateGameService {

  url = "https://localhost:7022/api/Game/update";

  constructor() { }

  async updateGame(data: Game)
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
      console.error('Update-game error: ', error);
      throw error;
    }
  }
}
