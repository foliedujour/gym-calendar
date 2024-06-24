import { Booking } from './booking';
export interface BookingResponse {
    booking: Booking;
    success: boolean;
    message: string;
}
