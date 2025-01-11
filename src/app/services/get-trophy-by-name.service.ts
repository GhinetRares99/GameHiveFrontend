import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTrophyByNameService {

  url = "https://localhost:7022/api/Trophy/getByName";

  constructor() { }

  async getTrophyByName(data: string)
  {
    try {
      const userToken = sessionStorage.getItem('authToken');

      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${userToken}`
        },
        body: data
      });

      return await response.json();
    } catch (error) {
      console.error('Get-trophy-by-name error: ', error);
      throw error;
    }
  }
}
