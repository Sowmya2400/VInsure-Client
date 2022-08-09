import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { AdminLogin } from 'src/app/Models/adminlogin';

import { ExInfo } from 'src/app/Models/Ex-Info';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  title = ExInfo.title;
  password : string;
  adminId : number;
  adminName :string
  rememberMe: boolean = true;


adminlogin : AdminLogin

  constructor(private adminService : AdminService , private router:Router ) {  }

  ngOnInit(): void {
    this.adminId = Number(localStorage.getItem("adminId"));
    this.password = localStorage.getItem("password");
    if(AdminExInfo.loggedIn){
      this.router.navigate(['admin-dashboard'])
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
    if(element.value){
      element.classList.remove('input-alert')
    }
  }
  onSubmit(element){
    if(this.rememberMe){
      localStorage.setItem("adminId", this.adminId+"");
      localStorage.setItem("adminPassword", this.password);
    }
    else{
      localStorage.removeItem("adminId");
      localStorage.removeItem("adminPassword");
    }
       
  this.adminlogin = new AdminLogin(this.adminId,this.password)

   this.adminService.loginAdmin(this.adminlogin).subscribe(
   res=>{
      console.log(res)
      AdminExInfo.adminId=res.adminId;
      AdminExInfo.password=res.password;
      AdminExInfo.adminName=res.adminName;
      AdminExInfo.email=res.email;
      AdminExInfo.dateOfBirth = res.dateOfBirth;
      AdminExInfo.loggedIn = true;
      this.router.navigate(['admin-dashboard'])

    //alert (res)
    
   
  }
      );
  
  }


  }



