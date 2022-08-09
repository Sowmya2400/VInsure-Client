import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cal-pre-four-wheeler',
  templateUrl: './cal-pre-four-wheeler.component.html',
  styleUrls: ['./cal-pre-four-wheeler.component.css']
})
export class CalPreFourWheelerComponent implements OnInit {

  carAge: number;
  carPrice: number;
  maxClaim: number;
  annualPremium: number;
  result: string;

  constructor() { }

  ngOnInit(): void {
  }

  calculatePremium(){
    if(this.carAge>10 || this.carAge<1){
      this.result = "Minimum 1 Year and Maximum 10 Years of age is allowed!"
    }
    else if(this.carPrice<50000){
      this.result = "Minimum Value of Car should be ₹50,000"
    }
    else{
       if(this.carAge<1){
      this.maxClaim = this.carPrice-15*this.carPrice/100;
    }
    else if(this.carAge>=1  && this.carAge<2){
      this.maxClaim = this.carPrice-20*this.carPrice/100;
    }
    else if(this.carAge>=2 && this.carAge<3){
      this.maxClaim = this.carPrice-30*this.carPrice/100;
    }
    else if(this.carAge>=3 && this.carAge<4){
      this.maxClaim = this.carPrice-40*this.carPrice/100;
    }
    else if(this.carAge>=4){
      this.maxClaim = this.carPrice-50*this.carPrice/100;
    }
    this.annualPremium = 350+this.carPrice*2/100;
    this.result = "Minimum Premium for this Car is ₹"+this.annualPremium+" annually and Max Claim can be of ₹"+this.maxClaim;
    }
   
  }

}
