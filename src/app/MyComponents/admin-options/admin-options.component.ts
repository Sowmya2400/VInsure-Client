import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';

@Component({
  selector: 'app-admin-options',
  templateUrl: './admin-options.component.html',
  styleUrls: ['./admin-options.component.css']
})
export class AdminOptionsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    if (!AdminExInfo.loggedIn) {
      this.router.navigate([''])
    }
  }

}
