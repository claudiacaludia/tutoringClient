import { Routes } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {AppointmentFormComponent} from './appointment-form/appointment-form.component';
import {AppointmentDetailComponent} from './appointment-detail/appointment-detail.component';
import {canNavigateToNewAppointment} from './can-navigate-to-new-appointment';
import {OwnAppointmentComponent} from './own-appointment/own-appointment.component';

export const routes: Routes = [
  {path:'', redirectTo:'appointments', pathMatch:'full'}, //ganze route muss übereinstimmen
  {path:'appointments', component: HomeComponent},
  {path:'appointments/:id', component: AppointmentDetailComponent},
  {path:'own-appointments', component: OwnAppointmentComponent},
  {path:'own-appointments/:id', component: AppointmentDetailComponent},
  {path:'login', component: LoginComponent},
  {path:'appointment-form', component: AppointmentFormComponent, canActivate: [canNavigateToNewAppointment]},
  {path:'appointment-form/:id', component: AppointmentFormComponent, canActivate: [canNavigateToNewAppointment]},
];
