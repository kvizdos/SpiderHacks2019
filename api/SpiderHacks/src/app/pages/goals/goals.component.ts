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
  selector: 'goals-root',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})

export class GoalsComponent {
  title = 'Goals';
  total = 100;

  lastSaved = localStorage.getItem("lastSaved") !== null ? localStorage.getItem("lastSaved") : 0;

  setupGoal = localStorage.getItem("goal") !== null ? false : true;

  goal;

  getSize = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

  constructor(private http: HttpClient) {
    if(!this.setupGoal) {
      this.goal = JSON.parse(localStorage.getItem("goal"));
      
      http.get("https://xgtzu6j45g.execute-api.us-east-2.amazonaws.com/v1/transactions?accountID=5c44a79db8e2a665da3ebae5&percentToSave="+this.goal['daily']+"&lastSaved=" + this.lastSaved).subscribe( (data) => {
        let newdata = JSON.parse([data]);

        this.lastSaved = parseInt(this.lastSaved.toString()) + parseInt(newdata[newdata.length - 1]['justSaved']);
        localStorage.setItem('lastSaved', this.lastSaved.toString());
      });
    }
  }

  calculateGoal(amount, goalDay) {
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    let newdate = year + "/" + month + "/" + day;

    var date_diff_indays = function(date1, date2) {
      let dt1 = new Date(date1);
      let dt2 = new Date(date2);
      return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
      }

    let timeLeft = date_diff_indays(newdate, goalDay)

    let newFormula = 10 + (amount / timeLeft) * .1;

    return newFormula;
  }

  setGoal(name, description, date, goal) {
    if(name == "" || description == "" || date == "" || goal == "") {
      alert("Please fill out all of the data!")
    } else {
      this.calculateGoal(goal, date);
      
      localStorage.setItem("goal", JSON.stringify({
        name: name,
        description: description,
        date: date,
        goal: goal,
        daily: this.calculateGoal(goal, date)
      }));

      alert(this.calculateGoal(goal, date) + "% will be added to each purchase.")

      window.location.reload();
      
    }
  }
}
