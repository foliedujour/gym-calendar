import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Correct property name is 'styleUrls' not 'styleUrl'
})
export class LoginComponent {
  username: string = '';  // Initialize variables
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}
  
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        // Store the JWT token
        localStorage.setItem('token', response.token);
        console.log(response);

        this.router.navigate(['welcome']);  // Redirect to calendar page
       
    },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
