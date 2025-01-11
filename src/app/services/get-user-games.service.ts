import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetUserGamesService {

  url = "https://localhost:7022/api/User/getUserGames";

  constructor() { }

  async getUserGames(){
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
      console.error('Get-user-games error: ', error);
      throw error;
    }
  }
}
