import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetGameByNameService {

  url = "https://localhost:7022/api/Game/getByName";

  constructor() { }

  async getGameByName(data: string)
  {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: data
      });

      return await response.json();
    } catch (error) {
      console.error('Get-game-by-name error: ', error);
      throw error;
    }
  }
}
