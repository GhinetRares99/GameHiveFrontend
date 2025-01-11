import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllGamesService {

  url = "https://localhost:7022/api/Game/getAll";

  constructor() { }

  async getAllGames()
  {
    try {
      const response = await fetch(this.url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      return await response.json();
    } catch (error) {
      console.error('Get-all-games error: ', error);
      throw error;
    }
  }
}
