import {Component, input} from '@angular/core';
import {Appointment} from '../shared/appointment';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'a.listItemClass',
  templateUrl: './appointment-item.component.html',
  imports: [
    DatePipe
  ],
  styles: ``,
})
export class AppointmentListItemComponent {

  appointment = input.required<Appointment>();
}
