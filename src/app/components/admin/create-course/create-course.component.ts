import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InstructorService } from 'src/app/shared/services/instructor.service';
import { CourseService } from 'src/app/shared/services/course.service';
import { Course } from 'src/app/shared/interfaces/course';
import { Instructor } from 'src/app/shared/interfaces/instructor';
import { GoBackButtonComponent } from '../../go-back-button/go-back-button.component';

@Component({
  selector: 'app-create-course',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, GoBackButtonComponent],
  templateUrl: './create-course.component.html',
  styleUrls: ['./create-course.component.css']
})
export class CreateCourseComponent implements OnInit {
  course: Course = {
    id: 0,
    title: '',
    description: '',
    instructorIds: []
  };
  allInstructors: Instructor[] = [];
  instructorSelections: number[] = [0]; // Array of instructor selections for admin to select more than one instructor if needed

  constructor(
    private courseService: CourseService,
    private instructorService: InstructorService,
  ) {}

  ngOnInit(): void {
    this.fetchInstructors();
  }

  fetchInstructors(): void { // Fetch all instructors to populate the instructor selection dropdown
    this.instructorService.getInstructors().subscribe({
      next: instructors => {
        this.allInstructors = instructors;
      },
      error: err => {
        console.error('Error fetching instructors:', err);
      },
      complete: () => {
        console.log('Instructor fetch complete');
      }
    });
  }

  addInstructorSelection(): void {
    if (this.instructorSelections.length < 4) {
      this.instructorSelections.push(0); // Add a new selection placeholder
      console.log('Instructor selection added:', this.instructorSelections);
    } else {
      alert('You can select up to 4 instructors.');
    }
  }

  removeInstructorSelection(index: number): void {
    this.instructorSelections.splice(index, 1); // Remove the selected instructor
    console.log('Instructor selection removed:', this.instructorSelections);
  }

  onInstructorChange(event: Event, index: number): void { // Event which takes the selected instructor id and updates the selection array
    const selectElement = event.target as HTMLSelectElement;
    const instructorId = Number(selectElement.value);  // Convert to number
    this.instructorSelections[index] = instructorId;
    console.log('Instructor selections updated:', this.instructorSelections);
  }

  hasDuplicateInstructors(): boolean {
     // Checks if there are duplicates and disable submit button
    const uniqueSelections = new Set(this.instructorSelections.filter(id => id !== 0));
    return uniqueSelections.size !== this.instructorSelections.filter(id => id !== 0).length;
  }

  prepareCourseData(): void {
    this.course.instructorIds = this.instructorSelections
      .filter(id => id !== 0) // Exclude placeholders
      
    console.log('Course to create:', this.course);
  }

  onSubmit(): void {
    this.prepareCourseData(); // Prepare and log course data before submission
    console.log(this.course.instructorIds)
    this.courseService.createCourse(this.course).subscribe({
      next: response => {
        alert('Course created successfully!');
      },
      error: error => {
        alert('Error creating course.');
      }
    });
  }
}
