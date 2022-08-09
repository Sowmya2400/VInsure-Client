import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cal-pre-two-wheeler',
  templateUrl: './cal-pre-two-wheeler.component.html',
  styleUrls: ['./cal-pre-two-wheeler.component.css']
})
export class CalPreTwoWheelerComponent implements OnInit {

  bikeAge: number;
  bikePrice: number;
  maxClaim: number;
  annualPremium: number;
  result: string;

  constructor() { }

  ngOnInit(): void {
  }

  calculatePremium(){
    if(this.bikeAge>10 || this.bikeAge<1){
      this.result = "Minimum 1 Year and Maximum 10 Years of age is allowed!"
    }
    else if(this.bikePrice<20000){
      this.result = "Minimum Value of Bike should be ₹20,000"
    }
    else{
      if(this.bikeAge<1){
        this.maxClaim = this.bikePrice-(15/100)*this.bikePrice/100;
      }
      else if(this.bikeAge>=1 && this.bikeAge<2){
        this.maxClaim = this.bikePrice-(20/100)*this.bikePrice;
      }
      else if(this.bikeAge>=2 && this.bikeAge<3){
        this.maxClaim = this.bikePrice-(30/100)*this.bikePrice;
      }
      else if(this.bikeAge>=3 && this.bikeAge<4){
        this.maxClaim = this.bikePrice-(40/100)*this.bikePrice;
      }
      else if(this.bikeAge>=4){
        this.maxClaim = this.bikePrice-(50/100)*this.bikePrice;
      }
      this.annualPremium = 350+this.bikePrice*2/100;
      this.result = "Minimum Premium for this Bike is ₹"+this.annualPremium+" annually and Max Claim can be of ₹"+this.maxClaim
    }
    
  }

}
