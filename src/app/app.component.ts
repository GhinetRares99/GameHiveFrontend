import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnimatedGalleryComponent } from './components/animated-gallery/animated-gallery.component';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'GameHive';
}
