import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimPolicy } from 'src/app/Models/claim-policy';
import { DashboardPolicy } from 'src/app/Models/dashboard-policy';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent implements OnInit {

  policyNo: number;
  f: boolean;

  constructor(private customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate(['login'])
    }
  }

  policyCheck(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (!(/^\d/.test(v))) {
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

  showError(element, message) {
    element.lastChild.classList.add('input-alert')
    element.children[1].textContent = message;
  }

  checkPolicyExists(element): boolean{
    let login = new Login(ExInfo.customerEmail, ExInfo.password);
    
    this.customerService.checkPolicyExists(login, String(this.policyNo)).subscribe(
      res=>{
        if(res.Response=='OK'){
          ClaimPolicy.policyNo = this.policyNo;
          ClaimPolicy.maxClaimAmount = res.MaxAmount;
          this.f = true  
        }
        else if(res.Response=='NOTFOUND'){
          this.showError(element, " - Policy No not found!")
          this.f = false;
        }
        else{
          this.showError(element, " - Server Error!")
          this.f = false;
        }
      })
      
      if(this.f){
        return true;
      }
      else{
        return false;
      }
  }


  route(element){
    console.log(this.checkPolicyExists(element))
    if(this.policyNo && this.checkPolicyExists(element)){
      this.router.navigate(['claim-form'])
    }
    else{
      this.policyCheck(element)
      this.checkPolicyExists(element)
    }
    
  }

  

}
