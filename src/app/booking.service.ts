import { Injectable } from '@angular/core';
import { Bookings } from './mock-bookings';
import { Booking } from './booking';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  bookingUrl: string = '/api/bookings'


  getBookings(): Observable<Booking[]> {
    let response = this.httpClient.get<Booking[]>(this.bookingUrl);
    return response;
  }


  deleteBooking(booking: Booking): Observable<Booking> {
    let id = '/' + booking.id
    let response = this.httpClient.delete<Booking>(this.bookingUrl + id);
    return response;
  }


  getBookingById(id: number): Observable<Booking> {
    let response = this.httpClient.get<Booking>(this.bookingUrl + '/' +  id);
    return response;
  }


  addBooking(booking: Booking): Observable<Booking> {
    let response = this.httpClient.post<Booking>(this.bookingUrl, booking);
    return response;
  }
}