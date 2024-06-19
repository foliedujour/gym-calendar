import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css'
})
export class WelcomeComponent implements OnInit {
  username: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getWelcomeMessage().subscribe({
      next: message => {
        this.username = message;
        
      },
      error: () => {
        this.router.navigate(['/login']);
      }
    });
  }
}
