import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  customerId: string = ExInfo.customerId
  name: String = ExInfo.fullname;
  email: String = ExInfo.customerEmail;
  dateOfBirth: String = ExInfo.dateOfBirth;


  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
    
  }

  logOut(){
    ExInfo.customerEmail = null;
    ExInfo.password = null;
    ExInfo.loggedIn = false;
    this.router.navigate([''])
  }

  myInsurance(){
    // let login = new Login(ExInfo.customerEmail, ExInfo.password)
    // this.customerService.getCustomerInsurance(login).subscribe(
    //   res=>{
    //     console.log(res)
    //   }
    // )
    this.router.navigate(['dashboard/my-insurance'])
  }

  options(){
    this.router.navigate(['dashboard/options'])
  }

  buyNewInsurance(){
    this.router.navigate(['buy-insurance'])
  }

}
