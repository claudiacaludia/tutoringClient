import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AuthenticationService} from './shared/authentification.service';

@Component({
  selector: 'bs-root',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public authService: AuthenticationService) {

  }


  isLoggedIn():boolean {
    return this.authService.isLoggedIn();
  }
  getLabel():string {
    return this.isLoggedIn() ? 'Logout' : 'Login';
  }

}
