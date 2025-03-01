import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeletePossessionService {

  url = "https://localhost:7022/api/Possession/delete";

  constructor() { }

  async deletePossession(data: string){
      try {
        const userToken = sessionStorage.getItem('authToken');
        
        const response = await fetch(this.url, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userToken}`
          },
          body: data
        });
  
        return response;
      } catch (error) {
        console.error('Delete-possession error: ', error);
        throw error;
      }
    }
}
