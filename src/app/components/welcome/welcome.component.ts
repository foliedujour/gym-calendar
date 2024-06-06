import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  username: string;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getWelcomeMessage().subscribe({
      next: message => {
        this.username = message;
        
      },
      error: () => {
        this.username = 'Unauthorized';
      }
    });
  }
}
