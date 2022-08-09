import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClaimPolicy } from 'src/app/Models/claim-policy';
import { ExInfo } from 'src/app/Models/Ex-Info';
import { Login } from 'src/app/Models/login';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-claim-form',
  templateUrl: './claim-form.component.html',
  styleUrls: ['./claim-form.component.css']
})
export class ClaimFormComponent implements OnInit {

  reason: string;
  amount: number;

  constructor(public customerService: CustomerService, private router: Router) { }

  ngOnInit(): void {
    if(!ExInfo.loggedIn){
      this.router.navigate([''])
    }
  }

  nameCheck(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false
    }
    else if (v.length > 25) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Maximum 30 characters is allowed!";
      return false
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }

  amountCheck(e): boolean {
    let v = e.lastChild.value
    if (!v) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - This field is required!";
      return false;
    }
    else if (!(/^\d/.test(v))) {
      e.lastChild.classList.add('input-alert')
      e.children[1].textContent = " - Enter proper amount!";
      return false;
    }
    else {
      e.lastChild.classList.remove('input-alert')
      e.children[1].textContent = "";
      return true;
    }
  }


  route(e1, e2){
    if(this.reason && this.amount){

    
    let login = new Login(ExInfo.customerEmail, ExInfo.password);
    
    this.customerService.checkPolicyExists(login, String(ClaimPolicy.policyNo)).subscribe(
      res=>{
        if(res.Response=='OK'){
          ClaimPolicy.policyNo = ClaimPolicy.policyNo;
          ClaimPolicy.maxClaimAmount = res.MaxAmount; 

          if(this.amount>ClaimPolicy.maxClaimAmount){
            e2.lastChild.classList.add('input-alert')
            e2.children[1].textContent = " - Max ₹"+ClaimPolicy.maxClaimAmount+" is allowed!";
          }
          else{
            ClaimPolicy.reason = this.reason;
            ClaimPolicy.amount = this.amount;
            this.customerService.addClaim(login, ClaimPolicy.policyNo, ClaimPolicy.reason, ClaimPolicy.amount).subscribe(res=>{
              if(res.Response=="OK"){
                this.router.navigate(['claim-submitted'])
              }
              else if(res.Response=="INCORRECT"){
                e2.lastChild.classList.add('input-alert')
                e2.children[1].textContent = " - Max ₹"+ClaimPolicy.maxClaimAmount+" is allowed!";
              }
              else{
                e2.lastChild.classList.add('input-alert')
                e2.children[1].textContent = " - Internal Server Error!";
              }
            })
            
          }
        }
      })
    }
    else{
      this.nameCheck(e1)
      this.amountCheck(e2)
    }
    
  }

}
