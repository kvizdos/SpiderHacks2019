import { Component } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = window.location.pathname.substr(1).toUpperCase();
  showHeader = this.title.length > 0 ? this.title !== "GOALS" ? true : false : false;
  showHomeOrPlus = this.title.length > 0 ? this.title !== "GOALS" ? true : false : false;
}
