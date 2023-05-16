import { Injectable } from '@angular/core';
import { Booking } from './booking';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  bookingUrl: string = '/api/bookings'


  /**
     * This method communicates with the server to retrieve a list of all bookings.
     * It sends a GET request to the booking API and returns an Observable that emits 
     * an array of bookings when the request is successful.
     *
     * @returns An Observable emitting an array of bookings from the API.
     */
  getBookings(): Observable<Booking[]> {
    let response = this.httpClient.get<Booking[]>(this.bookingUrl);
    return response;
  }


  /**
   * This method communicates with the server to delete a specific booking.
   * It sends a DELETE request to the booking API with the ID of the booking to be deleted.
   *
   * @param booking The booking object to be deleted. The booking's 'id' property is used to identify the booking in the API.
   * @returns An Observable that emits the deleted booking object when the DELETE request is successful.
   */
  deleteBooking(booking: Booking): Observable<Booking> {
    let id = '/' + booking.id
    let response = this.httpClient.delete<Booking>(this.bookingUrl + id);
    return response;
  }


  /**
   * This method retrieves a specific booking by its ID from the server.
   * It sends a GET request to the booking API with the ID of the booking.
   *
   * @param id The ID of the booking to retrieve.
   * @returns An Observable that emits the retrieved booking when the request is successful.
   */
  getBookingById(id: number): Observable<Booking> {
    let response = this.httpClient.get<Booking>(this.bookingUrl + '/' + id);
    return response;
  }



  /**
  * This method communicates with the server to add a new booking or update an existing one.
  * It sends a POST request to the booking API with the booking object to be added or updated.
  *
  * @param booking The booking object to be added to the server or updated.
  * @returns An Observable that emits the added or updated booking when the request is successful.
  */
  addBooking(booking: Booking): Observable<Booking> {
    let response = this.httpClient.post<Booking>(this.bookingUrl, booking);
    return response;
  }
}