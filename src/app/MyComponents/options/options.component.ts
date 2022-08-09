import { convertUpdateArguments } from '@angular/compiler/src/compiler_util/expression_converter';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/Models/customer';
import { CustomerUpdateWrapper } from 'src/app/Models/customer-update-wrapper';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {

  fullName: string;
  email: string;
  password: string;
  dateOfBirth: Date;
  contactNumber: string;
  address: string;
  buttonName: string = "Update";

  now: Date = new Date();
  maxDate: any = { year: this.now.getFullYear(), month: this.now.getMonth(), day: this.now.getDay() };
  minDate: any = { year: this.now.getFullYear() - 10, month: this.now.getMonth(), day: this.now.getDay() };;

  customer: CustomerUpdateWrapper;

  @ViewChild("nameElement") nameElement: ElementRef;
  @ViewChild("emailElement") emailElement: ElementRef;
  @ViewChild("passwordElement") passwordElement: ElementRef;
  @ViewChild("dateOfBirthElement") dateObBirthElement: ElementRef;
  @ViewChild("contactNumberElement") contactNumberElement: ElementRef;
  @ViewChild("addressElement") addressElement: ElementRef;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }

  }

  nameCheck(e): boolean {
    let v = e.lastChild.value
    if (v.length > 25) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Maximum 25 characters is allowed!";
      return false
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  emailCheck(e): boolean {
    let v = e.lastChild.value;
    if (v.length < 3) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper Email ID!";
      return false;
    }
    else if (!(v.includes("@") && v.includes(".") && (v.split("@").length - 1) == 1 && !(v.includes("@.") && v.includes(".@")))) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper Email ID!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  passwordCheck(e): boolean {
    let v = e.lastChild.value
    function checkNum(s) {
      for (let n of s) {
        if (/^\d/.test(n)) {
          return true;
        }
      }
      return false;
    }
    if (v.length < 8) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Minimum 8 characters is allowed!";
      return false;
    }
    else if (v.length > 20) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Maximum 20 characters is allowed!";
      return false;
    }
    else if (!checkNum(v)) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Atleast one number is required!";
      return false;
    }
    else if(!(v.includes("@") || v.includes(".") || v.includes("*") || v.includes("$"))){
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - One Special character(@.*$) is required!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  dateOfBirthCheck(e): boolean {
    let v = e.lastChild.value
    if (((new Date()).getTime()) < (new Date(this.dateOfBirth).getTime())) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter correct date!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  phoneCheck(e): boolean {
    let v = e.lastChild.value
    if (!(/^\d/.test(v))) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper number!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  addressCheck(e): boolean {
    let v = e.lastChild.value
    if (v.length < 10) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Minimum 10 characters is required!";
      return false
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  showError(element, message) {
    element.lastChild.classList.add('input-alert')
    element.children[1].textContent = message;
  }

  onSubmit(element) {
    this.buttonName = "Please Wait...";
    if (this.fullName ||
      this.email ||
      this.password ||
      this.dateOfBirth ||
      this.contactNumber ||
      this.address) 
    {
      console.log(ExInfo.customerEmail)
      this.customer = new CustomerUpdateWrapper(this.fullName, this.email, this.password, this.dateOfBirth, this.contactNumber, this.address, ExInfo.customerEmail, ExInfo.password);
      this.customerService.updateCustomer(this.customer).subscribe(
        res => {
          if(res.Response=="OK"){
            ExInfo.customerEmail = null;
            ExInfo.password = null;
            ExInfo.loggedIn = false;
            this.router.navigate(['login'])
          }
          else{
            console.log(res)
            alert("Server Error!")
            this.buttonName = "Update";
          }
          
        }
      );
    }
    else {
      this.showError(this.nameElement.nativeElement, " - Enter details in any field!")
      this.showError(this.emailElement.nativeElement, " - Enter details in any field!")
      this.showError(this.passwordElement.nativeElement, " - Enter details in any field!")
      this.showError(this.dateObBirthElement.nativeElement, " - Enter details in any field!")
      this.showError(this.contactNumberElement.nativeElement, " - Enter details in any field!")
      this.showError(this.addressElement.nativeElement, " - Enter details in any field!")
      this.buttonName = "Update";
    }
  }

}
