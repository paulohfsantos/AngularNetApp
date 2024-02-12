import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ITodo } from './model/todo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent implements OnInit {
  constructor(private http: HttpClient) {}

  ngOnInit() {
    // this.getForecasts();
  }

  helloWorld() {
    console.log('Hello World!');
  }

  title = 'angularnetapp.client';
}
