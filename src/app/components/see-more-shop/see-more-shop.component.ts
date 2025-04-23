import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { CommonModule } from '@angular/common';
import { Game, Possession, Trophy, User } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { GetGameByNameService } from '../../services/get-game-by-name.service';
import { GetTrophiesByGameIdService } from '../../services/get-trophies-by-game-id.service';
import { UpdateUserService } from '../../services/update-user.service';
import { GetUserService } from '../../services/get-user.service';
import { GetUserGamesService } from '../../services/get-user-games.service';
import { AddPossessionService } from '../../services/add-possession.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-see-more-shop',
  standalone: true,
  imports: [MenuComponent, CommonModule],
  templateUrl: './see-more-shop.component.html',
  styleUrl: './see-more-shop.component.scss'
})
export class SeeMoreShopComponent {
  game: Game | null | undefined;
  user: User | null | undefined;
  trophies: Trophy[] = [];
  games: Game[] = [];
  areTrophiesShown = false;
  token: string | undefined | null;
  gameAlreadyOwned = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
    private getGameByNameService: GetGameByNameService, 
    private getTrophiesByGameIdService: GetTrophiesByGameIdService,
    private updateUserService: UpdateUserService,
    private getUserService: GetUserService,
    private getUserGamesService: GetUserGamesService,
    private addPossessionService: AddPossessionService,
    private toastr: ToastrService) {}

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

    this.token = sessionStorage.getItem("authToken");
    if(this.token != null && this.token != undefined)
    {
        this.user = await this.getUserService.getUser();
    }

    if(this.user)
    {
      try {
        const response = await this.getUserGamesService.getUserGames();
        console.log(response);
  
        this.games = response;

        if (this.game) {
          this.gameAlreadyOwned = this.games.some(userGame => userGame.id === this.game?.id);
        }
      } catch (error) {
        console.error('Get-user-games error: ', error);
      }
    }
  }

  async buy(){
    if (this.token == null || this.token == undefined)
    {
      this.router.navigate(['/signin'])
    }
    else if (this.game && this.user)
    {
      if (this.user.balance < this.game.price) {
        this.toastr.error("You don't have enough balance to buy this game! You can add more from your account page!");
      }
      else
      {
        this.user.balance = this.user.balance - this.game.price;

        try {
          const possessionData: Possession = {
            id: '',
            gameId: this.game.id,
            userId: this.user.id,
          }

          const responsePossession = await this.addPossessionService.addPossession(possessionData);
          console.log(responsePossession.json());

          const response = await this.updateUserService.updateUser(this.user);
          console.log(response.json());
  
          if(responsePossession.status == 200 && response.status == 200)
          {
            this.router.navigate(['/my-games']);
          }
  
        } catch (error) {
          console.error('Update-user error: ', error);
        }
      }
    }
  }

  showTrophies(){
    this.areTrophiesShown = true;
  }

  hideTrophies(){
    this.areTrophiesShown = false;
  }
}
