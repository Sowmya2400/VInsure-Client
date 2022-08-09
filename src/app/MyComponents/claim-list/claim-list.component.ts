import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardClaims } from 'src/app/Models/admin-dashboard-claims';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { AdminLogin } from 'src/app/Models/adminlogin';
import { AdminService } from 'src/app/Services/admin.service';


@Component({
  selector: 'app-claim-list',
  templateUrl: './claim-list.component.html',
  styleUrls: ['./claim-list.component.css']
})
export class ClaimListComponent implements OnInit {
  approved: boolean = true;
  noClaims: boolean = true;
  claims: AdminDashboardClaims[];
  search: string;
  errorMessage: string = "No Claims Available";

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    if (!AdminExInfo.loggedIn) {
      this.router.navigate([''])
    }
    this.loadClaims()
  }

  loadClaims() {
    this.claims = [];
    this.noClaims = true;
    let adminlogin = new AdminLogin(AdminExInfo.adminId, AdminExInfo.password)
    this.adminService.getClaimsList(adminlogin).subscribe(
      res => {
        if (res.Response = "OK") {

          console.log(res)
          res.Claims.forEach(element => {

            let c = new AdminDashboardClaims(


              element[0],
              element[1],
              element[2],
              element[3],
              element[4],
              element[5]

            );

            this.claims.push(c);
            this.noClaims = false;

          });
        }
        else if (res.Response == "EMPTY") {

          this.errorMessage = "NO Claims Available!";
          this.noClaims = true;
        }
        else {
          this.noClaims = true;
          this.errorMessage = "Server Error!";
        }

      }
    )

  }

  run(decision, claimId) {
    let adminlogin = new AdminLogin(AdminExInfo.adminId, AdminExInfo.password)
    this.adminService.decision(adminlogin, claimId, decision).subscribe(
      res => {
        this.loadClaims()
      });
  }

  viewFile(f){
    AdminExInfo.documentFile = f;
    this.router.navigate(['view-file'])
  }

}










