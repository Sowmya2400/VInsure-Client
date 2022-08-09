import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-vehicle-info-form',
  templateUrl: './vehicle-info-form.component.html',
  styleUrls: ['./vehicle-info-form.component.css']
})
export class VehicleInfoFormComponent implements OnInit {

  manufacturer: string;
  model: string;
  purchaseDate: Date;
  licenseNo: string;
  registrationNo: string;
  engineNo: string;
  chassisNo: string;
  price: number;
  registrationFile: any;
  

  @ViewChild("VehicleManufacturerElement") vehicleManufacturerElement: ElementRef;
  @ViewChild("ModelElement") modelElement: ElementRef;
  @ViewChild("PurchaseDateElement") purchaseDateElement: ElementRef;
  @ViewChild("LicenseElement") licenseElement: ElementRef;
  @ViewChild("RegistrationElement") registrationElement: ElementRef;
  @ViewChild("RegistrationFileElement") registrationFileElement: ElementRef;
  @ViewChild("EngineElement") engineElement: ElementRef;
  @ViewChild("ChassisElement") chassisElement: ElementRef;
  @ViewChild("PriceElement") priceElement: ElementRef;

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
  }

  reqAndLen(e, length): boolean{
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false
    }
    else if (v.length > length && length !=0) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Maximum "+length+" characters is allowed!";
      return false
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  dateCheck(e): boolean{
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }

    else if (((new Date()).getTime()) < (new Date(this.purchaseDate).getTime())) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter correct date!";
      return false;
    }
    else if (((new Date()).getFullYear()-(new Date(this.purchaseDate)).getFullYear())>10) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Max age can be 11 Years!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  showError(element) {
    element.nativeElement.lastChild.classList.add('input-alert')
    element.nativeElement.children[1].textContent = " - This field is required!";
  }

  onFileUpload(e){
    let reader = new FileReader();
    let c = (result)=>{
      this.registrationFile = result
    }
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(){
      c(reader.result)
      
    }
    
    
  }

  onSubmit(e){
    if(!this.manufacturer){
      this.showError(this.vehicleManufacturerElement)
    }
    if(!this.model){
      this.showError(this.modelElement)
    }
    if(!this.purchaseDate){
      this.showError(this.purchaseDateElement)
    }
    if(!this.licenseNo){
      this.showError(this.licenseElement)
    }
    if(!this.registrationNo){
      this.showError(this.registrationElement)
    }
    if(!this.registrationFile){
      this.showError(this.registrationFileElement.nativeElement)
    }
    if(!this.engineNo){
      this.showError(this.engineElement)
    }
    if(!this.chassisNo){
      this.showError(this.chassisElement)
    }
    if(!this.price){
      this.showError(this.priceElement)
    }
    else{
      PolicyPurchased.manufacturer = this.manufacturer;
      PolicyPurchased.vehicleModel = this.model;
      PolicyPurchased.purchaseDate = this.purchaseDate;
      PolicyPurchased.licenseNo = this.licenseNo
      PolicyPurchased.registrationNo = this.registrationNo
      PolicyPurchased.registrationFile = this.registrationFile
      PolicyPurchased.engineNo = this.engineNo
      PolicyPurchased.chassisNo = this.chassisNo
      PolicyPurchased.vehiclePrice = this.price
      PolicyPurchased.policyDuration = 365;

      this.router.navigate(['view-plans'])
    }
  }

}
