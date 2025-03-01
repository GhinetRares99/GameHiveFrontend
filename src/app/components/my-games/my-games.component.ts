import { Component } from '@angular/core';
import { MenuComponent } from "../menu/menu.component";
import { Game, User } from '../../models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NameFilterPipe } from '../../pipes/name-filter.pipe';
import { FormsModule } from '@angular/forms';
import { GetUserGamesService } from '../../services/get-user-games.service';
import { RemovePossessionPopupComponent } from "../remove-possession-popup/remove-possession-popup.component";
import { GetUserService } from '../../services/get-user.service';

@Component({
  selector: 'app-my-games',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule, NameFilterPipe, RemovePossessionPopupComponent],
  templateUrl: './my-games.component.html',
  styleUrl: './my-games.component.scss'
})
export class MyGamesComponent {
  games: Game[] = [];
  user: User | null | undefined;
  userToken: string | null | undefined;
  nameFilter: string = '';
  isRemovePossessionPopupVisible = false;
  selectedGameId: string = '';
  currentUserId: string = '';

  constructor(private router: Router, private getUserGamesService: GetUserGamesService, private getUserService: GetUserService) {
  }

  async  ngOnInit(): Promise<void> {
    try {
      const response = await this.getUserGamesService.getUserGames();
      console.log(response);

      this.games = response;

      if(response.status == 401 || response.status == 403)
      {
        this.router.navigate(['/signin']);
      }

      this.userToken = sessionStorage.getItem("authToken");
      if(this.userToken != null && this.userToken != undefined)
      {
          this.user = await this.getUserService.getUser();
      }

      if(this.user)
      {
        this.currentUserId = this.user.id;
      }
    } catch (error) {
      console.error('Get-user-games error: ', error);
    }
  }

  navigateToSeeMore(gameName: string) {
    this.router.navigate(['/see-more', gameName]);
  }

  showRemovePossessionPopup(gameId: string) {
    this.selectedGameId = gameId;
    this.isRemovePossessionPopupVisible = true;
  }

  closeRemovePossessionPopup() {
    this.isRemovePossessionPopupVisible = false;
    this.selectedGameId = '';
    this.ngOnInit();
  }

}
