import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: FormBuilder
  ) { }

  booking: Booking = {
    id: 10,
    name: "Your Name",
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }


  bookingForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.required],
    roomNumber: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });


  ngOnInit() {

    if (this.router.url != '/create') {
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      this.bookingService.getBookingById(id).subscribe((result) => {
        this.booking = result;
      });
    }
  }


  save(): void {
    this.bookingService.addBooking(this.booking).subscribe((result) => {
      console.log(result);
    });

    this.router.navigate(['bookings']);
  }

  dateChanged(event: Event, isStart: boolean) {
    let val = (event.target as HTMLInputElement).value;

    if (isStart) {
      this.booking.startDate = new Date(val);
    } else {
      this.booking.endDate = new Date(val);
    }
  }
}
