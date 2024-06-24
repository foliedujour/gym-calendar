export interface CourseSession {
  id: number | null;
  courseId: number;
  instructorId: number
  startDateTime: string;
  endDateTime: string;
  roomId: number;
  }
