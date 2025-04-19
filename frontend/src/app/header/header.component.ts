import { Component } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isLanding=false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        /* console.log('Ruta actual:', event.urlAfterRedirects); */
        this.isLanding = event.urlAfterRedirects === '/';
      }
    });
  }

  onAddWaterPoint() {
    this.router.navigate(['/add-water-point']);
  }
}
