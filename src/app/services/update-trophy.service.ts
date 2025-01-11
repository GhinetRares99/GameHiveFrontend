import { Injectable } from '@angular/core';
import { Trophy } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UpdateTrophyService {

  url = "https://localhost:7022/api/Trophy/update";

  constructor() { }

  async updateTrophy(data: Trophy)
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
      console.error('Update-trophy error: ', error);
      throw error;
    }
  }
}
