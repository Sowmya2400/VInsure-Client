import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-help',
  templateUrl:'./help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  
  loggedIn: boolean;
  title: string = ExInfo.title

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loggedIn = ExInfo.loggedIn
  }
  
}
