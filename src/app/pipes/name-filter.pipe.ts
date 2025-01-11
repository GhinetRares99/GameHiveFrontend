import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models';

@Pipe({
  name: 'nameFilter',
  standalone: true
})
export class NameFilterPipe implements PipeTransform {

  transform(games: Game[], name: string): Game[] {
    if (!games || !name) {
      return games;
    }
    return games.filter(game =>
      game.name.toLowerCase().includes(name.toLowerCase())
    );
  }

}
