import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {

  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) { }


  /**
   * This method is used to save the API in the bookings-variable 
   */
  ngOnInit() {
    this.bookingService.getBookings().subscribe((result) => {
      this.bookings = result;
    });
  }


  /**
   * This code is used to delete one booking through the Method of the booking Service
   * 
   * @param booking is the Element which should be deleted
   */
  deleteBooking(booking: Booking): void {
    this.bookingService.deleteBooking(booking).subscribe();
    this.bookings = this.bookings.filter(b => b != booking);
  }
}
