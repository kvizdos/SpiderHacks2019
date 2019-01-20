import { Component } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@Component({
  selector: 'goals-root',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})

export class GoalsComponent {
  title = 'Goals';
  total = 100;
}
