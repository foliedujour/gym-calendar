import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseService } from 'src/app/shared/services/course.service';
import { Course } from 'src/app/shared/interfaces/course';
import { Instructor } from 'src/app/shared/interfaces/instructor';
import { Room } from 'src/app/shared/interfaces/room';
import { RoomService } from 'src/app/shared/services/room.service';
import { EventService } from 'src/app/shared/services/event.service'; 
import { CourseSession } from 'src/app/shared/interfaces/course-session';
import { GoBackButtonComponent } from '../../go-back-button/go-back-button.component';

@Component({
  selector: 'app-create-event',
  standalone: true,
  imports: [FormsModule, CommonModule, GoBackButtonComponent],
  templateUrl: './create-event.component.html',
  styleUrl: './create-event.component.css'
})
export class CreateCourseSessionComponent implements OnInit {
  courses: Course[] = []; 
  date: string = '';
  instructors: Instructor[] = []; 
  times: string[] = [];
  endTimes: string[] = [];
  rooms: Room[] = []; 
  loading = true;
  changeDetection: ChangeDetectionStrategy.OnPush;
  instructorAvailable : boolean = true;
  roomAvailable : boolean = true;
  minDate: string;

  courseSession = {
    courseName: '',
    instructor: '',
    date: '',
    startTime: '',
    endTime: '',
    room: '',
  };

  constructor(
    private courseService: CourseService,
    private eventService: EventService,
    private roomService: RoomService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.setMinDate();
    this.generateTimes();
    this.fetchCourses();
    this.fetchRooms();
  }

  generateTimes(): void {
    this.times = [];
    for (let hour = 8; hour <= 21; hour++) { // Ensure the last start time is 21:00
      this.times.push(`${hour < 10 ? '0' : ''}${hour}:00`);
      if (hour < 21) {
        this.times.push(`${hour < 10 ? '0' : ''}${hour}:30`);
      }
    }
  }

  generateEndTimes(startTime: string): void {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    this.endTimes = this.times.filter(time => {
      const [endHour, endMinute] = time.split(':').map(Number);
      const startDate = new Date();
      startDate.setHours(startHour, startMinute);
      const endDate = new Date();
      endDate.setHours(endHour, endMinute);
      return endDate.getTime() > startDate.getTime() + 30 * 60 * 1000;
    });

    // Add additional end times if the start time is 21:00
    if (startHour === 21 && startMinute === 0) {
      this.endTimes.push('21:30', '22:00', '22:30', '23:00');
    }
  }

  setMinDate(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  onStartTimeChange(event: Event): void {
    const startTime = (event.target as HTMLInputElement).value;
    this.generateEndTimes(startTime);
    if (this.courseSession.endTime && this.endTimes.indexOf(this.courseSession.endTime) === -1) {
      this.courseSession.endTime = '';
    }
    this.cdr.detectChanges();
    this.checkIfReadyForAvailabilityCheck();
  }

  onEndTimeChange(event: Event): void {
    const endTime = (event.target as HTMLInputElement).value;
    this.courseSession.endTime = endTime;
    this.cdr.detectChanges();
    this.checkIfReadyForAvailabilityCheck();
  }

  onDateChange(event: Event): void {
    this.date = (event.target as HTMLInputElement).value;
    this.cdr.detectChanges();
    this.checkIfReadyForAvailabilityCheck();
  }

  onRoomChange(event: Event): void {
    const room = (event.target as HTMLInputElement).value;
    this.courseSession.room = room;
    this.cdr.detectChanges();
    this.checkIfReadyForAvailabilityCheck();
  }

  onInstructorChange(event: Event): void {
    const instructor = (event.target as HTMLInputElement).value;
    this.courseSession.instructor = instructor;
    this.cdr.detectChanges();
    this.checkIfReadyForAvailabilityCheck();
  }

  onRepeatChange() {
    // Handle repeat change logic here if necessary
  }

  onSubmit(): void {
    const selectedCourse = this.courses.find(course => course.title === this.courseSession.courseName);
    if (!selectedCourse) {
      alert('Invalid course selected');
      return;
    }

    const selectedInstructor = this.instructors.find(inst => inst.firstname === this.courseSession.instructor);
    if (!selectedInstructor) {
      alert('Invalid instructor selected');
      return;
    }

    const selectedRoom = this.rooms.find(room => room.name === this.courseSession.room);
    if (!selectedRoom) {
      alert('Invalid room selected');
      return;
    }

    const newSession: CourseSession = {
      id: null,
      courseId: selectedCourse.id,
      instructorId: selectedInstructor.id,
      startDateTime: this.combineDateTime(this.date, this.courseSession.startTime),
      endDateTime: this.combineDateTime(this.date, this.courseSession.endTime),
      roomId: selectedRoom.id
    };

    this.eventService.createCourseSession(newSession).subscribe({
      next: response => {
        alert('Course session created successfully!');
      },
      error: error => {
        alert('Error creating course session.');
      }
    });
  }


  fetchCourses(): void {
    this.courseService.getCourses().subscribe(courses => {
      this.courses = courses;
      console.log('Courses:', this.courses); // Debug log to check courses
      this.cdr.markForCheck();
    });
  }

  fetchRooms(): void {
    this.roomService.getAllRooms().subscribe({
      next: (data: Room[]) => {
        this.rooms = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching rooms', err);
        this.loading = false;
        this.cdr.detectChanges();
      },
      complete: () => {
        console.log('Rooms fetching completed');
      }
    });
  }

  onCourseChange(): void {
    const selectedCourse = this.courses.find(course => course.title === this.courseSession.courseName);
    if (selectedCourse) {
      this.courseService.getInstructorsForCourse(selectedCourse.id).subscribe({
        next: (instructors: Instructor[]) => {
          this.instructors = instructors;
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error fetching instructors', err);
        }
      });
    } else {
      this.instructors = [];
    }
  }

  checkIfReadyForAvailabilityCheck(): void {
    if (this.courseSession.instructor && this.courseSession.startTime  && this.courseSession.endTime && this.courseSession.room) {
      this.checkAvailability();
    }
  }

  checkAvailability(): void {
    const startDateTime = this.combineDateTime(this.date, this.courseSession.startTime);
    const endDateTime = this.combineDateTime(this.date, this.courseSession.endTime);

    const selectedInstructor = this.instructors.find(inst => inst.firstname === this.courseSession.instructor);
    if (selectedInstructor) {
      this.eventService.checkInstructorAvailability(selectedInstructor.id, startDateTime, endDateTime).subscribe({
        next: (isAvailable: boolean) => {
          this.instructorAvailable = isAvailable;
          if (!isAvailable) {
            alert('Instructor is not available for the selected time slot.');
          }
        },
        error: (err) => {
          console.error('Error checking instructor availability', err);
        }
      });
    }

    const selectedRoom = this.rooms.find(room => room.name === this.courseSession.room);
    if (selectedRoom) {
      this.eventService.checkClassRoomAvailability(selectedRoom.id, startDateTime, endDateTime).subscribe({
        next: (isAvailable: boolean) => {
          this.roomAvailable = isAvailable;
          if (!isAvailable) {
            alert('Room is not available for the selected time slot.');
          }
        },
        error: (err) => {
          console.error('Error checking room availability', err);
        }
      });
    }
  }

  combineDateTime(date: string, time: string): string {
    return `${date}T${time}:00`;
  }


} export class CreateEventComponent {

}
