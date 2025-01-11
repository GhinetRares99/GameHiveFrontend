import { Injectable } from '@angular/core';
import { Trophy } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AddTrophyService {

  url = "https://localhost:7022/api/Trophy/add";

  constructor() { }

  async addTrophy(data: Trophy){
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
      console.error('Add-trophy error: ', error);
      throw error;
    }
  }
}
