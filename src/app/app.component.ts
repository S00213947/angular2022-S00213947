import { DOCUMENT } from '@angular/common';
import { Component, Inject} from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'clientApp2022';


  isAuthenticated$ = this.authService.isAuthenticated$


    
  constructor(private router: Router, public authService: AuthService){}
  

handleLogout() {
  this.authService.logout()
}

handleLogin() {
  this.authService.loginWithRedirect({appState: { target: '/profile',}})
}
handleSignUp() {
  this.authService.loginWithRedirect({screen_hint:"signup"})
}
}
