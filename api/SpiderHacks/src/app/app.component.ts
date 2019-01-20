import { Component } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = window.location.pathname.substr(1).toUpperCase();
  showHeader = this.title.length > 0 ? this.title !== "GOALS" ? true : false : false;
  showHomeOrPlus = this.title.length > 0 ? this.title !== "GOALS" ? true : false : false;

  showNavbar = window.location.pathname == "/" ? false : window.location.pathname == "/login" ? false : true;

  constructor(private http: HttpClient) {
    setInterval(function() {
      let stocks = JSON.parse(localStorage.getItem("stocks"));

      for(let stock in stocks) {
        http.get("https://api.iextrading.com/1.0/stock/"+stocks[stock]['symbol']+"/price").subscribe( (data) => {
          stocks[stock]['price'] = data;
          localStorage.setItem("stocks", JSON.stringify(stocks));
        });
      }
    }, 5000)
  }

}
