import { Component } from '@angular/core';
import {
  MatButtonModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatCardModule
} from '@angular/material';

@Component({
  selector: 'stock-root',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})

export class StockComponent {
  title = 'Stock';
  stocks = [];
  noStocks = false;

  setStock(stocks) {
    this.stocks = stocks;
  }

  addStock(symbol) {

    var xhttp2 = new XMLHttpRequest();
    xhttp2.onreadystatechange = (request) => {
      
        if (request.currentTarget['readyState'] == 4 && request.currentTarget['status'] == 200) {
          let coInfo = JSON.parse(xhttp.responseText);
          let stockPriceAnalysis = JSON.parse(xhttp3.responseText)[0];
          console.log(stockPriceAnalysis);
          let newStocks = JSON.parse(localStorage.getItem("stocks")) !== null ? JSON.parse(localStorage.getItem('stocks')) : [];
          newStocks.push({daily: {low: Math.ceil(stockPriceAnalysis['low']), avg: Math.ceil(stockPriceAnalysis['average']), high: Math.ceil(stockPriceAnalysis['high'])}, name: coInfo['companyName'], symbol: symbol, ceo: coInfo['ceo'], description: coInfo['description'], tags: coInfo['tags'], price: xhttp2.responseText})
          localStorage.setItem("stocks", JSON.stringify(newStocks));
          this.setStock(JSON.parse(localStorage.getItem("stocks")));
        }
        
    };

    var xhttp3 = new XMLHttpRequest();
    xhttp3.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          
          console.log(xhttp3.responseText)
          xhttp2.open("GET", "https://api.iextrading.com/1.0/stock/"+symbol+"/price", true);
          xhttp2.send();
        }
    };//

    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(xhttp4.responseText);
        }
    };

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          ///stock/{symbol}/chart/{range}
          xhttp4.open("GET", "https://api.iextrading.com/1.0/stock/"+symbol+"/logo", true);
          xhttp4.send();
          xhttp3.open("GET", "https://api.iextrading.com/1.0/stock/"+symbol+"/chart/1d", true);
          xhttp3.send();
        }
    };
    xhttp.open("GET", "https://api.iextrading.com/1.0/stock/"+symbol+"/company", true);
    xhttp.send();

  }

  constructor() {
    if(localStorage.getItem("stocks") !== null && JSON.parse(localStorage.getItem("stocks")).length > 0) {
      let tempStocks = JSON.parse(localStorage.getItem("stocks"));

      for(let stock in tempStocks) {

        this.stocks.push(tempStocks[stock]);
      }
    } else {
      this.noStocks = true;
    }
 
  }
}
