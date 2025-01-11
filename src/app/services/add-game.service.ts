import { Injectable } from '@angular/core';
import { Game } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AddGameService {

  url = "https://localhost:7022/api/Game/add";

  constructor() { }

  async addGame(data: Game){
    try {
      const userToken = sessionStorage.getItem('authToken');
      
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: JSON.stringify(data)
      });

      return response;
    } catch (error) {
      console.error('Add-game error: ', error);
      throw error;
    }
  }
}
