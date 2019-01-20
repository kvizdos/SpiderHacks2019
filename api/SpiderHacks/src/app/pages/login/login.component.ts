import { Component } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@Component({
  selector: 'login-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  title = 'Login';

  correctPw = true;

  login(username, password) {
    if(username == undefined || password == undefined) {
      this.correctPw = false;
      return;
    }
    if(username == "bfunk" && password == "password") {
      localStorage.setItem("username", username);
      window.location.pathname = '/goals';      this.correctPw = true;
    } else {
      this.correctPw = false;
    }
  }
}
