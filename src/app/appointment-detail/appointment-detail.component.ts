import {Component, OnInit, signal} from '@angular/core';
import {Appointment} from '../shared/appointment';
import {AppointmentStoreService} from '../shared/appointment-store.service';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {DatePipe} from '@angular/common';
import {AuthenticationService} from '../shared/authentification.service';
import {AppointmentFactory} from '../shared/appointment-factory';
import {AppointmentFormComponent} from '../appointment-form/appointment-form.component';

@Component({
  selector: 'bs-appointment-detail',
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
        console.log('Termin geladen geladen:', a);
        this.appointment.set(a);
      },
    );


  }

  removeAppointment() {
    if(this.appointment()){
      if(confirm('Willst du den Termin wirklich löschen?')){
        this.as.remove(this.appointment()!.id).subscribe(
          () => {
            this.toastr.success('Der Termin wurde gelöscht',"Nachhilfe App");
            this.router.navigate(['/appointments']);
          }, () => {
            this.toastr.error('Der Termin konnte nicht gelöscht werden',"Nachhilfe App");
          }
        );
      }
    }
  }

  acceptAppointment() {
    const appointment = this.appointment();
    if (!appointment){
      this.toastr.error('Der Termin konnte nicht akzeptiert werden.',"Nachhilfe App");
      return;
    }
    if(!this.authService.isLoggedIn()){
      this.toastr.warning('Bitte logge dich ein, um ein Angebot anzunehmen.');
      this.router.navigate(['/login']);
    }else {
      appointment.status = 'accepted';
      appointment.student_id = this.authService.getCurrentUserId();
      if(confirm('Willst du den Termin wirklich annehmen?')){
        this.as.update(appointment).subscribe(
          () => {
            this.toastr.success('Der Termin wurde angenommen.',"Nachhilfe App");
            this.router.navigate(['/appointments']);
          }, () => {
            this.toastr.error('Der Termin konnte nicht angenommen werden',"Nachhilfe App");
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
      this.toastr.success('Der Termin wurde angefragt.',"Nachhilfe App");
      this.router.navigate(['/own-appointments']);
    });
  }
}
