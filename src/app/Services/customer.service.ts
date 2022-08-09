import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddPolicyWrapper } from '../Models/add-policy-wrapper';
import { Customer } from '../Models/customer';
import { CustomerUpdateWrapper } from '../Models/customer-update-wrapper';
import { DashboardPolicy } from '../Models/dashboard-policy';
import { Login } from '../Models/login';
import { OtpWrapper } from '../Models/otp-wrapper';
import { Policy } from '../Models/policy';
import { policyLogin } from '../Models/policy-login';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  registerNewCustomer(customer: Customer, otp: number):Observable<any>{
    let registerUrl = "http://localhost:8585/vinsure/register/"+String(otp);
    return this.http.post<any>(registerUrl, customer);
  }

  updateCustomer(customer: CustomerUpdateWrapper):Observable<any>{
    let updateCustomerUrl = "http://localhost:8585/vinsure/update-customer";
    return this.http.post<any>(updateCustomerUrl, customer);
  }

  loginCustomer(login: Login):Observable<any>{
    let loginUrl = "http://localhost:8585/vinsure/login";
    return this.http.post<any>(loginUrl, login);
  }

  buyTravelPolicy(policyLoginObj:policyLogin):Observable<any>{
    let travelUrl="http://localhost:8585/vinsure/addTravelPolicy";
    return this.http.post<any>(travelUrl,policyLoginObj) 
  }

  buyVehiclePolicy(policyLoginObj:policyLogin):Observable<any>{
    let vehicleUrl="http://localhost:8585/vinsure/addVehiclePolicy";
    return this.http.post<any>(vehicleUrl,policyLoginObj)
  }
  
  getCustomerInsurance(login: Login):Observable<any>{
    let getCustomerPolicyUrl = "http://localhost:8585/vinsure/customer-policies";
    return this.http.post<any>(getCustomerPolicyUrl, login);
  }

  renewPolicy(login: Login, policyNo: string):Observable<any>{
    let renewUrl="http://localhost:8585/vinsure/renew/"+policyNo;
    return this.http.post<any>(renewUrl,login);
  }

  // fetchPolicyDetails(policyLoginObj:policyLogin):Observable<any>{
  //   let detailsUrl="http://localhost:8585/vinsure/policyDetails";
  //   return this.http.post<any>(detailsUrl,policyLoginObj);
  // }
  fetchPolicyDetails(login: Login, policyNo: string):Observable<any>{
    let detailsUrl="http://localhost:8585/vinsure/policyDetails/"+policyNo;
    return this.http.post<any>(detailsUrl,login);
  }

  checkPolicyExists(login: Login, policyNo: string):Observable<any>{
    let detailsUrl="http://localhost:8585/vinsure/check-policy/"+policyNo;
    return this.http.post<any>(detailsUrl,login);
  }

  addClaim(login: Login, policyNo: number, reason: string, amount: number):Observable<any>{
    let detailsUrl="http://localhost:8585/vinsure/add-claim/"+String(policyNo)+"/"+reason+"/"+String(amount);
    return this.http.post<any>(detailsUrl,login);
  }

  addPolicy(addPolicyWrapper: AddPolicyWrapper):Observable<any>{
    let detailsUrl="http://localhost:8585/vinsure/add-policy";
    return this.http.post<any>(detailsUrl,addPolicyWrapper);
  }

  sendOtp(email: String):Observable<any>{
    let detailsUrl="http://localhost:8585/vinsure/otp/"+email;
    return this.http.post<any>(detailsUrl,email);
  }

  checkOtp(otp: OtpWrapper):Observable<any>{
    let detailsUrl="http://localhost:8585/vinsure/check-otp";
    return this.http.post<any>(detailsUrl,otp);
  }



}
