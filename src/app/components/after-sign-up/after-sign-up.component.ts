import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-after-sign-up',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './after-sign-up.component.html',
  styleUrl: './after-sign-up.component.scss'
})
export class AfterSignUpComponent {

  constructor(private router: Router) {}

  continueToSignIn() {
    this.router.navigate(['signin']);
  }
}
