import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthenticationService} from '../shared/authentification.service';
import {ToastrService} from 'ngx-toastr';
import {AppointmentListComponent} from '../appointment-list/appointment-list.component';

interface Response{ //TypeScript bietet Interfaces an, um eine öffentliche Schnittstelle zu beschreiben
  access_token: string;
}

@Component({
  selector: 'ta-login',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: ``
})
export class LoginComponent implements OnInit{
  loginForm :FormGroup;

  constructor(private fb:FormBuilder,
              private router: Router,
              public authService: AuthenticationService,
              private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({});
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['',[Validators.required, Validators.email]],
      password: ['',[Validators.required]]
    });
  }

  login(){
    const val = this.loginForm.value;
    this.authService.login(val.username, val.password).subscribe(
      (res:any) =>{
        console.log(res);
        this.authService.setSessionStorage((res as Response).access_token);
        this.router.navigateByUrl("/")
      }, () => {
        this.toastr.error('Incorrect login data!','Appointment App')
      }
    )
  }

  isLoggedIn(){
    return this.authService.isLoggedIn();
  }

  logout(){
    this.authService.logout();
  }

}
