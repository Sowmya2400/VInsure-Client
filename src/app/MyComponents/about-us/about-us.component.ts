import { Component, OnInit } from '@angular/core';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  title: string = ExInfo.title
  companyEmail: string = ExInfo.companyEmail
  
  constructor() { }

  ngOnInit(): void {
  }

}
