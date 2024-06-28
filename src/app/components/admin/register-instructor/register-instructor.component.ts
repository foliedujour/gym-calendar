import { Component } from '@angular/core';
import { Instructor } from 'src/app/shared/interfaces/instructor';
import { InstructorService } from 'src/app/shared/services/instructor.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { GoBackButtonComponent } from '../../go-back-button/go-back-button.component';

@Component({
  selector: 'app-register-instructor',
  standalone: true,
  imports: [CommonModule, FormsModule, GoBackButtonComponent],
  templateUrl: './register-instructor.component.html',
  styleUrl: './register-instructor.component.css'
})
export class RegisterInstructorComponent {
 
  instructor: Instructor = { // data-binding for the form
    id: 0,
    firstname: '',
    lastname: '',
    ssn: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private instructorService: InstructorService) { }

  onSubmit(form: NgForm) {
    if (!this.instructor.firstname.trim() || !this.instructor.lastname.trim() || !this.instructor.ssn.trim()) {
      this.errorMessage = 'Please fill out all required fields.';
      return;
    }

    this.instructorService.registerInstructor(this.instructor).subscribe({
      next: (response) => {
        this.successMessage = 'Instructor registered successfully!';
        this.errorMessage = '';
        this.resetForm(form);
      },
      error: (error) => {
        this.errorMessage = 'Error registering instructor. SSN must be unique.';
        this.successMessage = '';
      }
    });
  }

  private resetForm(form: NgForm) {
    this.instructor = {
      id: 0,
      firstname: '',
      lastname: '',
      ssn: ''
    };
    form.resetForm(); // This resets the form state
  }
}
