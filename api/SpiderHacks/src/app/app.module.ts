import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatButtonModule} from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatFormFieldControl} from '@angular/material/form-field';

import {MatInputModule} from '@angular/material/input';

const routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      routes
    ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
