import { Injectable } from '@angular/core';
import { Possession } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AddPossessionService {

  url = "https://localhost:7022/api/Possession/add";

  constructor() { }

  async addPossession(data: Possession){
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
      console.error('Add-possession error: ', error);
      throw error;
    }
  }
}
