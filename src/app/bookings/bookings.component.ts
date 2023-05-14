import { Component, OnInit } from '@angular/core';
import { Bookings } from '../mock-bookings';

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

}
