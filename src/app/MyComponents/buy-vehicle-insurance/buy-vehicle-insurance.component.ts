import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { Policy } from 'src/app/Models/policy';
import { policyLogin } from 'src/app/Models/policy-login';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';
import { Vehicle } from 'src/app/Models/vehicle';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-buy-vehicle-insurance',
  templateUrl: './buy-vehicle-insurance.component.html',
  styleUrls: ['./buy-vehicle-insurance.component.css']
})
export class BuyVehicleInsuranceComponent implements OnInit {

    insuranceId:number;
    vehicletype:string;
    vehicleCompany:string;
    vehicleModel:string;
    purchaseDate:Date;
    licenseNo:string;
    registrationNo:string;
    engineNo:string;
    chassisNo:string;
    today:Date=new Date();
    policyDuration:number=1;
    isVehicleType:boolean=false;
    isPolicyType:boolean=false;
    isplan:boolean=false;
    priceOfPremium:number=12000;
    policyPlan:string;

    policy:Policy;
    vehicle:Vehicle;
    purchaseAmount:number;
    policyLoginObj:policyLogin;

    @ViewChild("policytypeElement") policytypeElement: ElementRef; 
    @ViewChild("vehicletypeElement") vehicletypeElement: ElementRef;   
    @ViewChild("vehicleCompanyElement") vehicleCompanyElement: ElementRef;
    @ViewChild("vehicleModelElement") vehicleModelElement: ElementRef;
    @ViewChild("purchaseDateElement") purchaseDateElement: ElementRef;
    @ViewChild("registrationNoElement") registrationNoElement: ElementRef;
    @ViewChild("licenseNoElement") licenseNoElement: ElementRef;
    @ViewChild("engineNoElement") engineNoElement: ElementRef;
    @ViewChild("chassisNoElement") chassisNoElement: ElementRef;
    @ViewChild("policyDurationElement") policyDurationElement: ElementRef;
    @ViewChild("purchaseAmountElement") purchaseAmountElement: ElementRef;


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

  

  onvehicleTypeNotSelected(element){
    let message=" - This field is required!"
    let para: HTMLElement = document.getElementById('vehicletype-notselected') as HTMLElement
    para.innerHTML = message;
   
    
  }
  onpolicyTypeNotSelected(element){
    let message=" - This field is required!"
    let para: HTMLElement = document.getElementById('policytype-notselected') as HTMLElement
    para.innerHTML = message;
  }
  onPlanNotSelected(){
    let message=" - This field is required!"
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML = message;
  }
  onComprehensive(){
    this.insuranceId=142
    let element: HTMLElement = document.getElementById('selected-policyType') as HTMLElement
    element.innerHTML = 'You have selected Comprehensive'
    this.isPolicyType=true;
    let para: HTMLElement = document.getElementById('policytype-notselected') as HTMLElement
    para.innerHTML="";
  }
  onThirdParty(){
    this.insuranceId=144
    let element: HTMLElement = document.getElementById('selected-policyType') as HTMLElement
    element.innerHTML = 'You have selected ThirdParty'
    this.isPolicyType=true;
    let para: HTMLElement = document.getElementById('policytype-notselected') as HTMLElement
    para.innerHTML="";
  }
  on2Wheeler(){
    this.vehicletype="2 Wheeler";
    let element: HTMLElement = document.getElementById('selected-vehicleType') as HTMLElement
    element.innerHTML = 'You have selected 2 Wheeler'
    this.isVehicleType=true;
    let para: HTMLElement = document.getElementById('vehicletype-notselected') as HTMLElement
    para.innerHTML="";
  }
  on3Wheeler(){
    this.vehicletype="3 Wheeler";
    let element: HTMLElement = document.getElementById('selected-vehicleType') as HTMLElement
    element.innerHTML = 'You have selected 3 Wheeler'
    this.isVehicleType=true;
    let para: HTMLElement = document.getElementById('vehicletype-notselected') as HTMLElement
    para.innerHTML="";
  }
  on4Wheeler(){
    this.vehicletype="4 Wheeler";
    let element: HTMLElement = document.getElementById('selected-vehicleType') as HTMLElement
    element.innerHTML = 'You have selected 4 Wheeler'
    this.isVehicleType=true;
    let para: HTMLElement = document.getElementById('vehicletype-notselected') as HTMLElement
    para.innerHTML="";
  }
  onPlatinum(){
    this.priceOfPremium=1000+(0.02*this.purchaseAmount)
    this.policyPlan="Platinum"
    let element: HTMLElement = document.getElementById('plan-selected') as HTMLElement
    element.innerHTML = 'You have selected Platinum plan'
    this.isplan=true;
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML="";
  }
  onGold(){
    this.priceOfPremium=(600+(0.02*this.purchaseAmount))
    this.policyPlan="Gold"
    let element: HTMLElement = document.getElementById('plan-selected') as HTMLElement
    element.innerHTML = 'You have selected Gold plan'
    this.isplan=true;
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML="";
  }
  onSilver(){
    this.priceOfPremium=(350+(0.02*this.purchaseAmount))
    this.policyPlan="Silver"
    let element: HTMLElement = document.getElementById('plan-selected') as HTMLElement
    element.innerHTML = 'You have selected Silver plan'
    this.isplan=true;
    let para: HTMLElement = document.getElementById('plan-notselected') as HTMLElement
    para.innerHTML="";
  }

  onSubmit(element){
    if(!this.isVehicleType){
      this.onpolicyTypeNotSelected(this.vehicletypeElement)
    }
    if(!this.isPolicyType){
      this.onvehicleTypeNotSelected(this.policytypeElement)
    }
    if(!this.isplan){
      this.onPlanNotSelected();
    }
    if(!this.vehicleCompany){
      this.onBlur(this.vehicleCompanyElement.nativeElement);
    }
    else if(!this.vehicleModel){
      this.onBlur(this.vehicleModelElement.nativeElement);
    }
    else if(!this.purchaseDate){
      this.onBlur(this.purchaseDateElement.nativeElement);
    }
    else if(!this.licenseNo){
      this.onBlur(this.licenseNoElement.nativeElement);
    }
    else if(!this.registrationNo){
      this.onBlur(this.registrationNoElement.nativeElement);
    }
    else if(!this.engineNo){
      this.onBlur(this.engineNoElement.nativeElement);
    }
    else if(!this.chassisNo){
      this.onBlur(this.chassisNoElement.nativeElement);
    }
    else if(!this.policyDuration){
      this.onBlur(this.policyDurationElement.nativeElement);
    }
    else{
      PolicyPurchased.vehicleType=this.vehicletype;PolicyPurchased.vehicleCompany=this.vehicleCompany;
      PolicyPurchased.vehicleModel=this.vehicleModel;PolicyPurchased.purchaseDate=this.purchaseDate;
      PolicyPurchased.licenseNo=this.licenseNo;PolicyPurchased.registrationNo=this.registrationNo;
      PolicyPurchased.engineNo=this.engineNo;PolicyPurchased.chassisNo=this.chassisNo;
      // PolicyPurchased.type=null;

      PolicyPurchased.customerId=ExInfo.customerId;PolicyPurchased.insuranceId=this.insuranceId;
      PolicyPurchased.policyDuration=this.policyDuration;PolicyPurchased.priceOfPremium=this.priceOfPremium;
      PolicyPurchased.policyPlan=this.policyPlan;

      console.log('Vehicle Details Submitted')
      this.router.navigate(['view-plans'])
      
    }
   }

}
