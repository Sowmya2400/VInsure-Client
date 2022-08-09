import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { AdminLogin } from 'src/app/Models/adminlogin';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  adminId: number;
  adminName: string;
  email: string;
  dateOfBirth: Date;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {

    if (!AdminExInfo.loggedIn) {
      this.router.navigate([''])
    }

    this.adminId = AdminExInfo.adminId;
    this.adminName = AdminExInfo.adminName;
    this.email = AdminExInfo.email;
    this.dateOfBirth = AdminExInfo.dateOfBirth;

  }
  getCustomerList() {

    this.router.navigate(['admin-dashboard/customer-list'])
  }

  logOut() {
    AdminExInfo.adminId = null;
    AdminExInfo.password = null;
    AdminExInfo.adminName = null;
    AdminExInfo.email = null;
    AdminExInfo.dateOfBirth = null;
    AdminExInfo.loggedIn = false;
    this.router.navigate([''])
  }

  getClaims() {
    this.router.navigate(['admin-dashboard/claim-list'])
  }

  
}





