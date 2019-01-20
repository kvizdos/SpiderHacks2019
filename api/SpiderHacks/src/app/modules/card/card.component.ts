import { Component } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@Component({
  selector: 'custom-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})

export class CardModule {
  title = 'card';
  total = 100;
}
