import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from '../booking.service';
import { FormBuilder, Validators } from '@angular/forms';


/**
 * Component to create a new booking or edit an existing one.
 */
@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {


  /**
 * @constructor
 * @param router Router for navigating among routes
 * @param activatedRoute Activated route to access route parameters
 * @param bookingService Service for booking-related API operations
 * @param formBuilder Form builder for reactive forms
 */
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private bookingService: BookingService,
    private formBuilder: FormBuilder
  ) { }


  /**
   * @property booking Booking object for creating or editing
   */
  booking: Booking = {
    id: 10,
    name: "Your Name",
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }


  /**
   * @property bookingForm Form group for booking details
   */
  bookingForm = this.formBuilder.group({
    id: ['', Validators.required],
    name: ['', Validators.compose([Validators.required, Validators.pattern('^[a-zA-Z ]+$'), Validators.minLength(5)])],
    roomNumber: ['', Validators.required],
    startDate: ['', Validators.required],
    endDate: ['', Validators.required]
  });


  /**
  * @method ngOnInit Lifecycle hook that is called after data-bound properties are initialized
  */
  ngOnInit() {
    // if url = edit/id
    if (this.router.url != '/create') {
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
      this.getBookingDetails(id);
    }
  }


  /**
    * Get booking details from the backend and set it to the local booking object
    * @param id ID of the booking to be retrieved
    */
  getBookingDetails(id: number) {
    this.bookingService.getBookingById(id).subscribe((result) => {
      this.booking = result;
      this.booking.startDate = new Date(this.booking.startDate);
      this.booking.endDate = new Date(this.booking.endDate);
      this.setBookingFormValues();
    });
  }


  /**
   * Sets the value of the booking object to the bookingForm
   */
  setBookingFormValues(): void {
    this.bookingForm.setValue({
      id: this.booking.id.toString(),
      name: this.booking.name,
      roomNumber: this.booking.roomNumber.toString(),
      startDate: this.formatDate(this.booking.startDate),
      endDate: this.formatDate(this.booking.endDate)
    });
  }


  /**
   * Formats the provided date into a string representation in the format 'yyyy-MM-dd'.
   * 
   * @param date - The date object to be formatted.
   * @returns A string representing the date in the 'yyyy-MM-dd' format.
   */
  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }


  /**
   * This method is used to save a new created Booking or update an existing booking.
   */
  save(): void {
    this.updateBookingFromForm();
    this.bookingService.addBooking(this.booking).subscribe();
    this.router.navigate(['bookings']);
  }


  /**
   * This Method is used to update the booking Property width the new value from the bookingForm
   */
  updateBookingFromForm(): void {
    this.booking.id = Number(this.bookingForm.get('id')?.value);
    this.booking.name = String(this.bookingForm.get('name')?.value);
    this.booking.roomNumber = Number(this.bookingForm.get('roomNumber')?.value);
    this.booking.startDate = new Date(String(this.bookingForm.get('startDate')?.value));
    this.booking.endDate = new Date(String(this.bookingForm.get('endDate')?.value));
  }


  /**
   * Updates the startDate or endDate of the booking based on user input.
   *
   * This function is triggered whenever the user changes the date in either the startDate or endDate input field.
   * It checks the isStart parameter to determine which date (startDate or endDate) should be updated.
   *
   * @param {Event} event - The event object representing the user's interaction with the date input field.
   * @param {boolean} isStart - A flag indicating whether the date being changed is the start date.
   *                            If true, the startDate is updated; if false, the endDate is updated.
   */
  dateChanged(event: Event, isStart: boolean) {
    let val = (event.target as HTMLInputElement).value;

    if (isStart) {
      this.booking.startDate = new Date(val);
    } else {
      this.booking.endDate = new Date(val);
    }
  }
}
