import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentification.service';
import {AppointmentStoreService} from '../shared/appointment-store.service';
import {AppointmentFactory} from '../shared/appointment-factory';
import {AppointmentFormErrorMessages} from './appointment-form-error-messages';
import {api_url} from '../shared/api-urls';
import {Appointment} from '../shared/appointment';
import {catchError, retry} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {DateValidator} from '../shared/date-validator';
import {AppointmentContainerComponent} from '../appointment-container/appointment-container.component';

@Component({
  selector: 'ta-appointment-form',
  imports: [
    ReactiveFormsModule,
    AppointmentContainerComponent
  ],
  templateUrl: './appointment-form.component.html',
  styles: ``
})
export class AppointmentFormComponent implements OnInit{
  appointmentForm : FormGroup;
  isUpdatingAppointment : boolean = false;
  appointment = AppointmentFactory.empty();
  errors:{[key:string]:string} ={};
  topics: any[] = [];

  constructor(private fb:FormBuilder,private as:AppointmentStoreService,
              private route:ActivatedRoute, private router:Router,
              private authService:AuthenticationService,
              private http: HttpClient){
    this.appointmentForm = this.fb.group({}); //formmodell definieren
  }

  ngOnInit() {
    this.http.get<Array<Appointment>>(`${api_url}/topics`).pipe(retry(3))
      .subscribe(data => {
        this.topics = data;
      });
    const id = this.route.snapshot.params["id"];
    if (id) {
      this.isUpdatingAppointment = true;
      this.as.getSingle(id).subscribe(appointment => {
        this.appointment = appointment;
        this.initAppointmentForm();
      });
    }
    this.initAppointmentForm();
  }



  initAppointmentForm(){
    this.appointmentForm = this.fb.group({
      id: this.appointment.id,
      description:[this.appointment.description,Validators.required],
      price: [this.appointment.price,Validators.required],
      proposed_time: [this.appointment.proposed_time, [Validators.required, DateValidator.pastDate]],
      status: [this.appointment.status, Validators.required],
      student_id: this.appointment.student_id,
      topic_id: this.appointment.topic_id,
    })
    this.appointmentForm.statusChanges.subscribe(()=>{ //Observable
      this.updateErrorMessages();
    })
  }

  updateErrorMessages(){
    this.errors = {};
    for(const message of AppointmentFormErrorMessages){
      const control = this.appointmentForm.get(message.forControl);
      if(control && control.dirty && control.invalid && control.errors &&
        control.errors[message.forValidator] && !control.errors[message.forControl]){
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    const appointment: Appointment = AppointmentFactory.fromObject(this.appointmentForm.value);
    if(this.isUpdatingAppointment){
      this.as.update(appointment).subscribe(() => {
        this.router.navigate(['/own-appointments', appointment.id]);
      });
    } else {
      appointment.tutor_id = this.authService.getCurrentUserId();
      this.as.create(appointment).subscribe(() => {
        this.appointmentForm.reset(AppointmentFactory.empty());
        this.appointment = AppointmentFactory.empty();
        this.router.navigate(['/own-appointments']);
      });
    }
  }


}
