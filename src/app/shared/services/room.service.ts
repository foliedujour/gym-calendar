import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from '../interfaces/room';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  private apiURL = `${environment.apiURL}/api/rooms`;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getAllRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.apiURL, { headers: this.authService.getAuthHeaders() });
  }
}