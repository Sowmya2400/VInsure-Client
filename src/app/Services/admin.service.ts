import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminLogin } from '../Models/adminlogin';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

 

  loginAdmin(login: AdminLogin):Observable<any>{
    let registerUrl = "http://localhost:8585/vinsure/admin-login";
    return this.http.post<any>(registerUrl, login);
  }
 

  getCustomerList(adminlogin: AdminLogin):Observable<any>{
    let getCustomerListUrl = "http://localhost:8585/vinsure/customerlist";
    return this.http.post<any>(getCustomerListUrl, adminlogin);
  }

  getClaimsList(adminlogin:AdminLogin):Observable<any>{
    let getClaimsListUrl = "http://localhost:8585/vinsure/claimslist";
    return this.http.post<any>(getClaimsListUrl, adminlogin)
  }
   
 decision(adminlogin:AdminLogin,claimId:number,dec:string):Observable<any>{
   let decisionUrl="http://localhost:8585/vinsure/decision/"+claimId+"/"+dec;
   return this.http.post<any>(decisionUrl, adminlogin)

 }
}