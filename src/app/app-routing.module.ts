import { EmbeddedViewRef, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookingsComponent } from './bookings/bookings.component';
import { CreateBookingComponent } from './create-booking/create-booking.component';
import { EventSignUpComponent } from './event-sign-up/event-sign-up.component';


const routes: Routes = [
  {
    path: 'bookings', component: BookingsComponent
  },
  {
    path: 'create', component: CreateBookingComponent
  },
  {
    path: 'events', component: EventSignUpComponent
  },
  {
    path: 'edit/:id', component: CreateBookingComponent
  },
  {
    path: '', redirectTo: 'bookings', pathMatch: 'full'
  }

];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
