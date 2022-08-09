import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  title: string = ExInfo.title
  loggedIn: boolean = ExInfo.loggedIn

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  route(path) {
    this.router.navigate([path])
  }
}