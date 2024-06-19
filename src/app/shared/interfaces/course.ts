import { Instructor } from './instructor';
export interface Course {
    id: number;
    title: string;
    description: string;
    instructorIds: number[];
}
