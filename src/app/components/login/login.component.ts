import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  // Correct property name is 'styleUrls' not 'styleUrl'
})
export class LoginComponent implements OnInit {
  username: string = '';  // Initialize variables
  password: string = '';
  errorMessage: string = '';
  message: string = '';

  constructor(private authService: AuthService, private router: Router, private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.route.queryParams.subscribe(params =>{
      this.message = params['message'];
    } );
  }
  
  login() {
    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        // Redirect based on the user role
        if (response.role === 'ROLE_ADMIN') {
          this.router.navigate(['admin/dashboard']); // Redirect to admin dashboard
        } else {
          this.router.navigate(['user/dashboard']); // Redirect to user dashboard
        }
      },
      error: () => {
        this.errorMessage = 'Invalid username or password';
      }
    });
  }
}
