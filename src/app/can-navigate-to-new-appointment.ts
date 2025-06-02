import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthenticationService} from './shared/authentification.service';
import {ToastrService} from 'ngx-toastr';

export const canNavigateToNewAppointment: CanActivateFn = (route, state) => {
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  const toastr = inject(ToastrService);
  if(authService.isLoggedIn() && authService.isTutor()){
    return true;
  }else {
    toastr.error('You are not logged in as a tutor!');
    router.navigate(['/login']);
    return false;
  }
};
