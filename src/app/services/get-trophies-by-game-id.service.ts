import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTrophiesByGameIdService {

  url = "https://localhost:7022/api/Trophy/getByGameId";

  constructor() { }

  async getTrophiesByGameId(data: string)
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
      console.error('Get-trophies-by-game-id error: ', error);
      throw error;
    }
  }
}
