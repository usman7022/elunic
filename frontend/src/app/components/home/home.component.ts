import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  imports: [RouterModule],
  selector: 'app-home',
  template: `
    <div class="home-content">
      <app-root></app-root>
    </div>
  `,
  styles: [`
    .home-content {
      width: 100%;
      height: 100%;
    }
  `]
})
export class HomeComponent {}