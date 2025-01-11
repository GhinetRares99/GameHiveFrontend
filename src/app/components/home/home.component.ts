import { Component } from '@angular/core';
import { MenuComponent } from '../menu/menu.component';
import { AnimatedGalleryComponent } from '../animated-gallery/animated-gallery.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MenuComponent, AnimatedGalleryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
