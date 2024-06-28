import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-go-back-button',
  standalone: true,
  imports: [],
  template: `<button class="go-back-btn" (click)="goBack()">
  <span>&#8592; back</span> <!-- Left arrow symbol -->
</button>`,
  styleUrl: './go-back-button.component.css'
})
export class GoBackButtonComponent { // a simple go back button template is above
  constructor(private location: Location) {}

  goBack(): void {
    this.location.back();
  }
}
