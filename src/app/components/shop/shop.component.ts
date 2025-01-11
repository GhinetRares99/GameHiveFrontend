import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { GetAllGamesService } from '../../services/get-all-games.service';
import { Router } from '@angular/router';
import { Game } from '../../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NameFilterPipe } from '../../pipes/name-filter.pipe';
import { GenreFilterPipe } from '../../pipes/genre-filter.pipe';
import { PriceFilterPipe } from '../../pipes/price-filter.pipe';

@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [MenuComponent, CommonModule, FormsModule, NameFilterPipe, GenreFilterPipe, PriceFilterPipe],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.scss'
})
export class ShopComponent {
  games: Game[] = [];
  nameFilter: string = '';
  genreFilter: string = '';
  priceFilter: number | null = null;

  constructor(private router: Router, private getAllGamesService: GetAllGamesService) {
  }

  async  ngOnInit(): Promise<void> {
    try {
      const response = await this.getAllGamesService.getAllGames();
      console.log(response);

      this.games = response;
    } catch (error) {
      console.error('Get-all-games error: ', error);
    }
  }

  navigateToSeeMoreShop(gameName: string) {
    this.router.navigate(['/see-more-shop', gameName]);
  }

}
