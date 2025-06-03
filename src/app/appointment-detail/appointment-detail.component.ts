import {Component, OnInit, signal} from '@angular/core';
import {Appointment} from '../shared/appointment';
import {AppointmentStoreService} from '../shared/appointment-store.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../shared/authentification.service';
import {AppointmentFactory} from '../shared/appointment-factory';

@Component({
  selector: 'ta-appointment-detail',
  imports: [
    RouterLink,
    DatePipe
  ],
  templateUrl: './appointment-detail.component.html',
  styles: ``
})
export class AppointmentDetailComponent implements OnInit{
  appointment = signal<Appointment|undefined>(undefined);
  constructor(private as:AppointmentStoreService,
              private route:ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public authService: AuthenticationService //geht auch so: const authService = inject(AuthenticationService);
  ) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;

    this.as.getSingle(params['id']).subscribe(
      (a: Appointment) => {
        this.appointment.set(a);
      },
    );


  }

  removeAppointment() {
    if(this.appointment()){
      if(confirm('Do you really want to delete this appointment?')){
        this.as.remove(this.appointment()!.id).subscribe(
          () => {
            this.toastr.success('The appointment has been deleted',"Tutoring App");
            this.router.navigate(['/own-appointments']);
          }, () => {
            this.toastr.error('Appointment could not be deleted',"Tutoring App");
          }
        );
      }
    }
  }

  acceptAppointment() {
    const appointment = this.appointment();
    if (!appointment){
      this.toastr.error('The appointment could not be accepted',"Tutoring App");
      return;
    }
    if(!this.authService.isLoggedIn()){
      this.toastr.warning('Please log in to accept an offer.');
      this.router.navigate(['/login']);
    }else {
      appointment.status = 'accepted';
      appointment.student_id = this.authService.getCurrentUserId();
      if(confirm('Do you really want to accept the appointment?')){
        this.as.update(appointment).subscribe(
          () => {
            this.toastr.success('The appointment was accepted',"Tutoring App");
            this.router.navigate(['/own-appointments']);
          }, () => {
            this.toastr.error('The appointment could not be accepted',"Tutoring App");
          }
        );
      }
    }
  }


  requestAppointment(value: string) {
    if (!value) return;

    const proposedDate = new Date(value);
    const newAppointment: Appointment = AppointmentFactory.empty();
    newAppointment.id = this.appointment()!.id;
    newAppointment.price = this.appointment()!.price;
    newAppointment.topic_id = this.appointment()!.topic_id;
    newAppointment.description = this.appointment()!.description;
    newAppointment.tutor_id = this.appointment()!.tutor_id;
    newAppointment.proposed_time = proposedDate.toISOString();
    newAppointment.status = 'proposed_by_student';
    newAppointment.student_id = this.authService.getCurrentUserId();

    this.as.create(newAppointment).subscribe(() => {
      this.toastr.success('The date was requested',"Appointment App");
      this.router.navigate(['/own-appointments']);
    });
  }
}
