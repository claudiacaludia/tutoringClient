import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AppointmentListComponent} from '../appointment-list/appointment-list.component';
import {AuthenticationService} from '../shared/authentification.service';
@Component({
  selector: 'bs-home',
  templateUrl: './home.component.html',
  styles: ``,
  imports: [
    AppointmentListComponent
  ]
})
export class HomeComponent {
  constructor(private router : Router,
              private route:ActivatedRoute,
              public authService: AuthenticationService,) {
  }


}
