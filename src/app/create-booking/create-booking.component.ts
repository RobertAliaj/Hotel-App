import { Component, OnInit } from '@angular/core';
import { Booking } from '../booking';
import { Bookings } from '../mock-bookings';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {


  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  booking: Booking = {
    id: 10,
    name: "Your Name",
    roomNumber: 100,
    startDate: new Date(),
    endDate: new Date()
  }

  ngOnInit() {

    if (this.router.url != '/create') {
      // Hole die Id aus der URL (die Id Variable wird bei app-routing-module definiert)
      let id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

      // Finde in dem Array Bookings das Objekt, dessen id gleich der aus der URL extrahierten id ist 
      let bookingById = Bookings.find(x => x.id == id)!;

      // Setze das Booking-Objekt dieser Komponente auf das gefundene Booking-Objekt aus dem Array.
      // Da wir eine Zwei-Wege-Datenbindung (Two-Way Binding) in den Formularfeldern verwenden, 
      // werden die Werte des gefundenen Booking-Objekts automatisch in den entsprechenden Feldern angezeigt.
      this.booking = bookingById;
    }
  }


  save(): void {

    let bookingById = Bookings.find(x => x.id == this.booking.id);

    // Wenn keine Booking mit der selben Id von dem URL gefunden wird dann wird eine neue Booking erstellt
    // Ansonsten wird die aktuelle Booking (gleiche id wie vom URL) einfach von den neuen Werten überschrieben
    // Die neuen Werte werden in die "booking" Variable durch die (Two-Way Binding) gesetzt
    if (!bookingById) {  
      Bookings.push(this.booking);
    } else {
      bookingById = this.booking;
    }

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
