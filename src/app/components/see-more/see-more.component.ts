import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { ActivatedRoute, Router } from '@angular/router';
import { GetGameByNameService } from '../../services/get-game-by-name.service';
import { GetTrophiesByGameIdService } from '../../services/get-trophies-by-game-id.service';
import { Game, Trophy } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-see-more',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './see-more.component.html',
  styleUrl: './see-more.component.scss'
})
export class SeeMoreComponent {
  game: Game | null | undefined;
  trophies: Trophy[] = [];
  isInstalled = false;
  isPlaying = false;
  areTrophiesShown = false;

  constructor(private route: ActivatedRoute, private router: Router, private getGameByNameService: GetGameByNameService, private getTrophiesByGameIdService: GetTrophiesByGameIdService) {}

  async ngOnInit(): Promise<void> {
    const gameName = this.route.snapshot.paramMap.get('gameName');
    const gameNameData = JSON.stringify({ name: gameName });

    try {
      const responseGame = await this.getGameByNameService.getGameByName(gameNameData);
      console.log(responseGame);

      this.game = responseGame;
    } catch (error) {
      console.error('Get-game-by-name error: ', error);
    }

    if (this.game) {
      try {
        const gameId = this.game.id;
        const gameIdData = JSON.stringify({ gameId: gameId });

        const responseTrophies = await this.getTrophiesByGameIdService.getTrophiesByGameId(gameIdData);
        console.log(responseTrophies);
  
        this.trophies = responseTrophies;
      } catch (error) {
        console.error('Get-trophies-by-game-id error: ', error);
      }
    }
  }

  installGame() {
    this.isInstalled = true;
  }

  playGame() {
    this.isPlaying = true;
  }

  stopGame() {
    this.isPlaying = false;
  }

  uninstallGame() {
    this.isInstalled = false;
    this.isPlaying = false;
  }

  showTrophies(){
    this.areTrophiesShown = true;
  }

  hideTrophies(){
    this.areTrophiesShown = false;
  }
}

