import { Component, OnInit } from '@angular/core';
import { ExInfo } from 'src/app/Models/Ex-Info';

@Component({
  selector: 'app-termsandconditions',
  templateUrl: './termsandconditions.component.html',
  styleUrls: ['./termsandconditions.component.css']
})
export class TermsandconditionsComponent implements OnInit {

  title: string = ExInfo.title

  constructor() { }

  ngOnInit(): void {
    

  }

}
