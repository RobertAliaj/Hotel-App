import { Component, OnInit } from '@angular/core';
import { Bookings } from '../mock-bookings';
import { Booking } from '../booking';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent  implements OnInit {

  bookings =  Bookings;


  constructor(){}

  ngOnInit(){
    console.log(this.bookings);
  }


  deleteBooking(booking: Booking){
    let index = Bookings.indexOf(booking);
    Bookings.splice(index, 1)
  }

}
