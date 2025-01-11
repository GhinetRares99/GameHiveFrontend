import { Pipe, PipeTransform } from '@angular/core';
import { Game } from '../models';

@Pipe({
  name: 'genreFilter',
  standalone: true
})
export class GenreFilterPipe implements PipeTransform {

  transform(games: Game[], genre: string): Game[] {
    if (!games || !genre) {
      return games;
    }
    return games.filter(game =>
      game.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

}
