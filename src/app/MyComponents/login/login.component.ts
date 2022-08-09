import { Component, ElementRef, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  title = ExInfo.title;
  username: string;
  password: string;
  rememberMe: boolean = true;

  login: Login;


  @ViewChild("usernameElement") emailElement: ElementRef;
  @ViewChild("passwordElement") passwordElement: ElementRef;
  @ViewChild("termsElement") termsElement: ElementRef;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
      this.username = localStorage.getItem("username");
      this.password = localStorage.getItem("password");
      if(ExInfo.loggedIn){
        this.router.navigate(['dashboard'])
      }
  }

  emailCheck(e): boolean {
    let v = e.lastChild.value;
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (v.length < 3) {
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
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (v.length < 8) {
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




  onBlur(element){
    if(!element.lastChild.value){
      element.lastChild.classList.add('input-alert')
      element.children[1].textContent = " - This field is required!";
    }
    else{
      element.lastChild.classList.remove('input-alert')
      element.children[1].textContent = "";
    }
  }

  onInput(element){
    if(element.lastChild.value){
      element.lastChild.classList.remove('input-alert')
      element.children[1].textContent = "";
    }
  }

  showError(element, message){
    element.firstChild.textContent = message;
  }

  onSubmit(element){
    // if(!this.username){
    //   this.onBlur(this.emailElement.nativeElement);
    // }
    // else if(!this.password){
    //   this.onBlur(this.passwordElement.nativeElement);
    // }
    if( this.username && this.password ){
      this.login = new Login(this.username, this.password);
      if(this.rememberMe){
        localStorage.setItem("username", this.username);
        localStorage.setItem("password", this.password);
      }
      else{
        localStorage.removeItem("username");
        localStorage.removeItem("password");
      }
      this.customerService.loginCustomer(this.login).subscribe(
        res=>{
          if(res.Response=="OK"){
            ExInfo.loggedIn = true;
            ExInfo.customerEmail = res.email;
            ExInfo.password = this.password;
            ExInfo.fullname = res.name;
            ExInfo.dateOfBirth = res.dateOfBirth;
            ExInfo.customerId = res.customerId;
            this.router.navigate(['dashboard'])
          }
          else if(res.Response=="INCORRECT"){
            this.showError(this.termsElement.nativeElement, "Incorrect Credentials!");
          }
          else{
            ExInfo.loggedIn = false;
            this.showError(this.termsElement.nativeElement, "Internal Server Error!");
          }
          
        }
      );
    }
    else{
      this.emailCheck(this.emailElement.nativeElement)
      this.passwordCheck(this.passwordElement.nativeElement)
    }
   }

   register(){
     this.router.navigate(['register'])
   }

   forgotPassword(){
     this.router.navigate(['forgot-password'])
   }

}
