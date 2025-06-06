import { Component, computed, OnInit, Input } from '@angular/core';
import {AppointmentContainerComponent} from '../appointment-container/appointment-container.component';
import {httpResource} from '@angular/common/http';
import {Appointment} from '../shared/appointment';
import {api_url} from '../shared/api-urls';
import {AppointmentListItemComponent} from '../appointment-item/appointment-item.component';
import {RouterLink} from '@angular/router';
import {AppointmentStoreService} from '../shared/appointment-store.service';
import {AuthenticationService} from '../shared/authentification.service';
import {Subject} from '../shared/subject';


@Component({
  selector: 'ta-appointment-list',
  imports: [
    AppointmentContainerComponent,
    AppointmentListItemComponent,
    RouterLink
  ],
  templateUrl: './appointment-list.component.html',
  styles: ``
})
export class AppointmentListComponent implements OnInit {
  @Input() title = '';
  @Input() api_route = '';
  @Input() routerLink = '';
  userId: number | undefined;

  constructor(
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    this.userId = this.authService.getCurrentUserId();
  }

  appointment = httpResource<Appointment[]>(
    () => `${api_url}${this.api_route}`
  );

  subjects = httpResource<Subject[]>(
    () => `${api_url}/subjects`,
  );

  groupedAppointments = computed(() => { //read-only signal
    const subjects = this.subjects.value();
    const appointments = this.appointment.value();

    return subjects?.map(subject => ({
      subject,
      appointments: appointments?.filter(appointment => appointment.topic?.subject_id === subject.id)
    }));
  });
}
