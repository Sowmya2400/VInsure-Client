import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { Policy } from 'src/app/Models/policy';
import { policyLogin } from 'src/app/Models/policy-login';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';
import { Travel } from 'src/app/Models/travel';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-buy-travel-insurance',
  templateUrl: './buy-travel-insurance.component.html',
  styleUrls: ['./buy-travel-insurance.component.css']
})
export class BuyTravelInsuranceComponent implements OnInit {
    insuranceId:number=140;
    type:string;
    departureDate:string;
    returnDate:string;
    placeOfVisit:string;
    numberOfPeople:number;
    policyDuration:number;
    todayDate:Date=new Date();
   istravelType:boolean=false;
   isplan:boolean=false;
   priceOfPremium:number;
   policyPlan:string;

   policy:Policy;
    travel:Travel;
    policyLoginObj:policyLogin;
   

    @ViewChild("traveltypeElement") traveltypeElement: ElementRef;
    @ViewChild("departureDateElement") departureDateElement: ElementRef;
    @ViewChild("returnDateElement") returnDateElement: ElementRef;
    @ViewChild("placeOfVisitElement") placeOfVisitElement: ElementRef;
    @ViewChild("numberOfPeopleElement") numberOfPeopleElement: ElementRef;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
  }

  onBlur(element, message = " - This field is required!"){
    if(!element.lastChild.value){
      element.lastChild.classList.add('input-alert')
      element.children[1].textContent = message;
    }
    else{
      element.lastChild.classList.remove('input-alert')
      element.children[1].textContent = "";
    }
  }
  ontravelTypeNotSelected(element){
    let message=" - This field is required!"
    let para: HTMLElement = document.getElementById('traveltype-notselected') as HTMLElement
    para.innerHTML = message;
    
  }
  onPlanNotSelected(){
    let message=" - This field is required!"
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML = message;
  }
  onFamily(){
    this.type="Family";
    let element: HTMLElement = document.getElementById('selected') as HTMLElement
    element.innerHTML = 'You have selected Family'
    this.istravelType=true;
    let para: HTMLElement = document.getElementById('traveltype-notselected') as HTMLElement
    para.innerHTML="";

  }
  onIndividual(){
    this.type="Individual";
    let element: HTMLElement = document.getElementById('selected') as HTMLElement
    element.innerHTML = 'You have selected Individual'
    this.istravelType=true;
    let para: HTMLElement = document.getElementById('traveltype-notselected') as HTMLElement
    para.innerHTML="";
  }
  onPlatinum(){
    this.durationCalculation();
    this.priceOfPremium=(1000+(100*this.policyDuration))*this.numberOfPeople
    this.policyPlan="Platinum"
    let element: HTMLElement = document.getElementById('plan-selected') as HTMLElement
    element.innerHTML = 'You have selected Platinum plan'
    this.isplan=true;
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML="";
  }
  onGold(){
    this.durationCalculation();
    this.priceOfPremium=(600+(100*this.policyDuration))*this.numberOfPeople
    this.policyPlan="Gold"
    let element: HTMLElement = document.getElementById('plan-selected') as HTMLElement
    element.innerHTML = 'You have selected Gold plan'
    this.isplan=true;
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML="";
  }
  onSilver(){
    this.durationCalculation();
    this.priceOfPremium=(350+(100*this.policyDuration))*this.numberOfPeople
    this.policyPlan="Silver"
    let element: HTMLElement = document.getElementById('plan-selected') as HTMLElement
    element.innerHTML = 'You have selected Silver plan'
    this.isplan=true;
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML="";
  }

 durationCalculation(){
   let date1=new Date(this.returnDate);
   let date2=new Date (this.departureDate);
   let timeInMilisec: number = date1.getTime() - date2.getTime();
   let daysBetweenDates: number = Math.ceil(timeInMilisec / (1000 * 60 * 60 * 24));
   this.policyDuration=daysBetweenDates;
 }
 

  onSubmit(element){
    if(!this.istravelType){
      this.ontravelTypeNotSelected(this.traveltypeElement)
    }
    if(!this.isplan){
      this.onPlanNotSelected();
    }
    if(!this.departureDate){
      this.onBlur(this.departureDateElement.nativeElement);
    }
    else if(!this.returnDate){
      this.onBlur(this.returnDateElement.nativeElement);
    }
    else if(!this.placeOfVisit){
      this.onBlur(this.placeOfVisitElement.nativeElement);
    }
    else if(!this.numberOfPeople){
      this.onBlur(this.numberOfPeopleElement.nativeElement);
    }
    else{
      this.durationCalculation();
      // PolicyPurchased.type=this.type;PolicyPurchased.departureDate=this.departureDate;PolicyPurchased.returnDate=this.returnDate;
      PolicyPurchased.placeOfVisit=this.placeOfVisit;PolicyPurchased.numberOfPeople=this.numberOfPeople;
      PolicyPurchased.vehicleType=null;

      PolicyPurchased.customerId=ExInfo.customerId;PolicyPurchased.insuranceId=this.insuranceId;
      PolicyPurchased.policyDuration=this.policyDuration;PolicyPurchased.priceOfPremium=this.priceOfPremium;
      PolicyPurchased.policyPlan=this.policyPlan;

      console.log('Travel Details Submitted')
      this.router.navigate(['view-plans-travel'])
      
      
    }
   }
}
