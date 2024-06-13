import { Course } from './course';

export interface Instructor {
    id: number;
    firstName: string;
    lastName: string;
    courses: Course[];
}
