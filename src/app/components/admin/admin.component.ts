import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';
import { GetAllGamesService } from '../../services/get-all-games.service';
import { GetAllUsersService } from '../../services/get-all-users.service';
import { GetAllTrophiesService } from '../../services/get-all-trophies.service';
import { Game, Trophy, User } from '../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteUserByIdService } from '../../services/delete-user-by-id.service';
import { DeleteGameByIdService } from '../../services/delete-game-by-id.service';
import { DeleteTrophyByIdService } from '../../services/delete-trophy-by-id.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {
  games: Game[] = [];
  users: User[] = [];
  trophies: Trophy[] = [];
  selectedOption: string = "users";

  constructor(
    private router: Router,
    private getAllGamesService: GetAllGamesService,
    private getAllUsersService: GetAllUsersService,
    private getAllTrophiesService: GetAllTrophiesService,
    private deleteUserByIdService: DeleteUserByIdService,
    private deleteGameByIdService: DeleteGameByIdService,
    private deleteTrophyByIdService: DeleteTrophyByIdService) {}

  async  ngOnInit(): Promise<void> {
    try {
      const responseGames = await this.getAllGamesService.getAllGames();
      console.log(responseGames);

      this.games = responseGames;

      const responseUsers = await this.getAllUsersService.getAllUsers();
      console.log(responseUsers);

      this.users = responseUsers;

      const responseTrophies = await this.getAllTrophiesService.getAllTrophies();
      console.log(responseTrophies);

      this.trophies = responseTrophies;
    } catch (error) {
      console.error('Admin error: ', error);
    }
  }

  async deleteUserById(id: string)
  {
    try {
      const data = JSON.stringify({ id: id });
      const response = await this.deleteUserByIdService.deleteUserById(data);
      console.log(response);

      const token = sessionStorage.getItem("authToken") ?? '';
      const payloadBase64Url = token.split('.')[1];
      const payloadBase64 = payloadBase64Url?.replace(/-/g, '+').replace(/_/g, '/');
      const payloadJson = atob(payloadBase64);
      const payload = JSON.parse(payloadJson);

      var userId = payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
      if(id == userId)
      {
        sessionStorage.removeItem("role");
        sessionStorage.removeItem("authToken");
        this.router.navigate(['']);
      }
      else
      {
        this.ngOnInit();
      }

    } catch (error) {
      console.error('Delete-user-by-id error: ', error);
    }
  }

  async deleteTrophyById(id: string)
  {
    try {
      const data = JSON.stringify({ id: id });
      const response = await this.deleteTrophyByIdService.deleteTrophyById(data);
      console.log(response);

      this.ngOnInit();
    } catch (error) {
      console.error('Delete-trophy-by-id error: ', error);
    }
  }

  async deleteGameById(id: string)
  {
    try {
      const data = JSON.stringify({ id: id });
      const response = await this.deleteGameByIdService.deleteGameById(data);
      console.log(response);

      this.ngOnInit();
    } catch (error) {
      console.error('Delete-game-by-id error: ', error);
    }
  }

  navigateToAddGame()
  {
    this.router.navigate(['/admin/add-game']);
  }

  navigateToAddTrophy()
  {
    this.router.navigate(['/admin/add-trophy']);
  }

  navigateToUpdateTrophy(trophyName: string)
  {
    this.router.navigate(['/admin/update-trophy', trophyName]);
  }

  navigateToUpdateGame(gameName: string)
  {
    this.router.navigate(['/admin/update-game', gameName]);
  }

  navigateToUpdateUserAdmin(userName: string)
  {
    this.router.navigate(['/admin/update-user-admin', userName]);
  }
}
