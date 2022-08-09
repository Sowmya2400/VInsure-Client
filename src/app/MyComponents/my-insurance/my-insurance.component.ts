import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimPolicy } from 'src/app/Models/claim-policy';
import { DashboardPolicy } from 'src/app/Models/dashboard-policy';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { Policy } from 'src/app/Models/policy';
import { policyLogin } from 'src/app/Models/policy-login';
import { PolicyPurchased } from 'src/app/Models/policyPurchased';
import { PolicyToRenew } from 'src/app/Models/policyToRenew';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-my-insurance',
  templateUrl: './my-insurance.component.html',
  styleUrls: ['./my-insurance.component.css']
})
export class MyInsuranceComponent implements OnInit {

  policies: DashboardPolicy[] = [];
  noPolicy: boolean = true;
  errorMessage: string = "No Policy Purchased!";
  policy:Policy
  search: string;
  constructor(private customerService: CustomerService,private router:Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
    this.loadPolicies();
  }

  loadPolicies(){
    let login = new Login(ExInfo.customerEmail, ExInfo.password)
    this.customerService.getCustomerInsurance(login).subscribe(
      res=>{
        if(res.Response="OK"){
          
          res.Policies.forEach(element => {
            let p = new DashboardPolicy(
              element[0],
              element[1],
              element[2],
              element[3],
              element[4],
              element[5],
              element[6],
              element[7]
            );
            this.policies.push(p);
            this.noPolicy = false;
          });
          
        }
        else if(res.Response=="EMPTY"){
            this.errorMessage = "No Policy Purchased";
            this.noPolicy = true;
        }
        else{
          this.noPolicy = true;
          this.errorMessage = "Server Error!";
        }
        
    })
  }

  onRenew(element){
     PolicyToRenew.policyNo=element.value;
    let login=new Login(ExInfo.customerEmail,ExInfo.password);
    // this.policY.policyNo=element.value;
    // let policyLoginObj=new policyLogin(this.policY,login)
    this.customerService.fetchPolicyDetails(login, element.value).subscribe(
      res=>{
        if(res.Response=="Details Fetched"){
          console.log(res);
          if(res.Expiry_Status=="Expired"){
          PolicyToRenew.price=res.Price;
          PolicyToRenew.vehicleCompany=res.Vehicle_Company;
          PolicyToRenew.vehicleModel=res.Vehicle_Model;
          PolicyToRenew.registrationNumber=res.Registration_Number;
          PolicyToRenew.licenseNo=res.License_No;
          this.router.navigate(['/renew-payment'])
          }
          else{
            console.log("Not expired");
            this.router.navigate(['/renew-notexpired'])
          }
        }
        else if(res.Response=="No policy with the policy No"){
          console.log("No such policy");
        }
        else{
          console.log("Login details are wrong")
        }
      }
    )
    
  }


  claim(element){
    ClaimPolicy.policyNo = element.value;
    this.router.navigate(['claim-form']);
  }
  


}
