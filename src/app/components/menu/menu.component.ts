import { CommonModule } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserService } from '../../services/get-user.service';
import { User } from '../../models';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  userRole: string | null | undefined;
  userName: string | null | undefined;
  userToken: string | null | undefined;
  user: User | null | undefined;

  constructor(private router: Router, private getUserService: GetUserService, @Inject(PLATFORM_ID) private platformId: Object) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.userRole = sessionStorage.getItem("role");
      this.userToken = sessionStorage.getItem("authToken");

      if(this.userToken != null && this.userToken != undefined)
      {
        this.user = await this.getUserService.getUser();
      }
    }
  }

  navigateToShop() {
    this.router.navigate(['/shop']);
  }

  navigateToHome() {
    this.router.navigate(['']);
  }

  navigateToSignIn() {
    this.router.navigate(['/signin']);
  }

  navigateToSignUp() {
    this.router.navigate(['/signup']);
  }

  navigateToMyGames() {
    this.router.navigate(['/my-games']);
  }

  navigateToAdmin() {
    this.router.navigate(['/admin']);
  }

  navigateToAccount() {
    this.router.navigate(['/account']);
  }

  signOut() {
    this.router.navigate(['']);
    this.userRole = null;
    this.userToken = null;
    this.user = null;
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("authToken");
  }
}
