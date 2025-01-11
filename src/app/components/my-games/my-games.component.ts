import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Game } from '../../models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NameFilterPipe } from '../../pipes/name-filter.pipe';
import { FormsModule } from '@angular/forms';
import { GetUserGamesService } from '../../services/get-user-games.service';

@Component({
  selector: 'app-my-games',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule, NameFilterPipe],
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.scss'
})
export class MyGamesComponent {
  games: Game[] = [];
  nameFilter: string = '';

  constructor(private router: Router, private getUserGamesService: GetUserGamesService) {
  }

  async  ngOnInit(): Promise<void> {
    try {
      const response = await this.getUserGamesService.getUserGames();
      console.log(response);

      this.games = response;
    } catch (error) {
      console.error('Get-user-games error: ', error);
    }
  }

  navigateToSeeMore(gameName: string) {
    this.router.navigate(['/see-more', gameName]);
  }

}
