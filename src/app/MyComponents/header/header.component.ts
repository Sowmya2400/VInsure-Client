import { Component, Input, OnInit } from '@angular/core';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = ExInfo.title;
  @Input()
  loggedIn: boolean = ExInfo.loggedIn;
  agentLoggedIn: boolean = AdminExInfo.loggedIn;

  constructor() { }

  ngOnInit(): void {
    this.loggedIn = ExInfo.loggedIn;
    this.agentLoggedIn = AdminExInfo.loggedIn;
  }
}
