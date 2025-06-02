import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentification.service';
import {AppointmentListComponent} from '../appointment-list/appointment-list.component';

@Component({
  selector: 'bs-own-appointment',
  imports: [
    AppointmentListComponent
  ],
  templateUrl: './own-appointment.component.html',
  styles: ``
})
export class OwnAppointmentComponent {
  constructor(public authService: AuthenticationService,) {}
}
