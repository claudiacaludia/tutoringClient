import { Component, computed, OnInit, Input } from '@angular/core';
import {AppointmentContainerComponent} from '../appointment-container/appointment-container.component';
import {httpResource} from '@angular/common/http';
import {Appointment} from '../shared/appointment';
import {api_url} from '../shared/api-urls';
import {AppointmentListItemComponent} from '../appointment-item/appointment-item.component';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AppointmentStoreService} from '../shared/appointment-store.service';
import {ToastrService} from 'ngx-toastr';
import {AuthenticationService} from '../shared/authentification.service';


@Component({
  selector: 'bs-appointment-list',
  imports: [
    AppointmentContainerComponent,
    AppointmentListItemComponent,
    RouterLink
  ],
  templateUrl: './appointment-list.component.html',
  styles: ``
})
export class AppointmentListComponent implements OnInit{
  @Input() title = '';
  @Input() api_route = '';
  @Input() routerLink = '';
  userId: number | undefined;
  constructor(private as:AppointmentStoreService,
              public authService: AuthenticationService //geht auch so: const authService = inject(AuthenticationService);
  ) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
  }
  isLoggedIn():boolean {
    return this.authService.isLoggedIn();
  }

  appointment = httpResource<Appointment[]>(
    () => `${api_url}${this.api_route}`
  )

  /*openAppointments = httpResource<Appointment[]>(
    () =>`${api_url}/appointments/open`,
  )
  tutorAppointments = httpResource<Appointment[]>(
    () =>`${api_url}/appointments/tutor/${(this.userId)}`,
  )
  studentAppointments = httpResource<Appointment[]>(
    () =>`${api_url}/appointments/student/${(this.userId)}`,
  )*/
}
