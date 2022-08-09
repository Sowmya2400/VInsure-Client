import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.css']
})
export class TravelFormComponent implements OnInit {

  departureDate: Date;
  arrivalDate: Date;
  placeOfVisit: string;
  noOfMembers: number;
  ticketFile: any;

  @ViewChild("DepartureDateElement") departureDateElement: ElementRef;
  @ViewChild("ArrivaleDateElement") arrivaleDateElement: ElementRef;
  @ViewChild("TicketFileElement") ticketFileElement: ElementRef;
  @ViewChild("PlaceOfVisitElement") placeOfVisitElement: ElementRef;
  @ViewChild("NoOfMembersElement") noOfMembersElement: ElementRef;


  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
    this.noOfMembers = PolicyPurchased.numberOfPeople
  }

  calculateDiff(d: Date, a: Date) {
    var date1:any = new Date(d);
    var date2:any = new Date(a);
    var diffDays:any = Math.floor((date2 - date1) / (1000 * 60 * 60 * 24));

    return diffDays;
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

  departureDateCheck(e): boolean{
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }

    else if (((new Date()).getTime()) > (new Date(this.departureDate).getTime())) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter correct date!";
      return false;
    }
    else if (((new Date(this.departureDate)).getFullYear()-(new Date()).getFullYear())>2) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Max 2 Year is allowed!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  arrivalDateCheck(e): boolean{
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }

    else if (((new Date(this.arrivalDate)).getTime()) < (new Date(this.departureDate).getTime())) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter correct date!";
      return false;
    }
    else if (((new Date(this.departureDate)).getFullYear()-(new Date(this.arrivalDate)).getFullYear())>2) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Max 2 Year is allowed!";
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
      this.ticketFile = result
    }
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function(){
      c(reader.result)
      
    }
    
    
  }

  onSubmit(e){
    if(!this.departureDate){
      this.showError(this.departureDateElement)
    }
    if(!this.arrivalDate){
      this.showError(this.arrivaleDateElement)
    }
    if(!this.placeOfVisit){
      this.showError(this.placeOfVisitElement)
    }
    if(!this.ticketFile){
      this.showError(this.ticketFileElement.nativeElement)
    }
    if(!this.noOfMembers){
      this.showError(this.noOfMembersElement)
    }
    else{
      PolicyPurchased.departureDate = this.departureDate
      PolicyPurchased.returnDate = this.arrivalDate
      PolicyPurchased.placeOfVisit = this.placeOfVisit
      PolicyPurchased.registrationFile = this.ticketFile
      PolicyPurchased.numberOfPeople = this.noOfMembers
      PolicyPurchased.policyDuration = this.calculateDiff(PolicyPurchased.departureDate, PolicyPurchased.returnDate)

      this.router.navigate(['view-plans-travel'])
    }
  }


}
