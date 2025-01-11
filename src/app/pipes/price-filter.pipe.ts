import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models';

@Pipe({
  name: 'priceFilter',
  standalone: true
})
export class PriceFilterPipe implements PipeTransform {

  transform(games: Game[], maxPrice: number | null): Game[] {
    if (!games || maxPrice === null) {
      return games;
    }
    return games.filter(game => game.price <= maxPrice);
  }

}
