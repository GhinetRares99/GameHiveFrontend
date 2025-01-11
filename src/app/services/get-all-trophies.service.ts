import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetAllTrophiesService {

  url = "https://localhost:7022/api/Trophy/getAll";

  constructor() { }

  async getAllTrophies()
  {
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
      console.error('Get-all-trophies error: ', error);
      throw error;
    }
  }
}
