import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminDashboardCustomers } from 'src/app/Models/admin-dashboard-customers';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';
import { AdminLogin } from 'src/app/Models/adminlogin';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {

  noCustomer: boolean = true;
  customers: AdminDashboardCustomers[] = [];
  errorMessage: string = "No Customer Available!";
  search: string;

  constructor(private adminService: AdminService, private router: Router) { }

  ngOnInit(): void {
    if (!AdminExInfo.loggedIn) {
      this.router.navigate([''])
    }
    this.loadCustomers()
  }

  loadCustomers() {

    let adminlogin = new AdminLogin(AdminExInfo.adminId, AdminExInfo.password)

    this.adminService.getCustomerList(adminlogin).subscribe(
      res => {
        if (res.Response = "OK") {
          this.noCustomer = false;
          res.Customers.forEach(element => {
            let p = new AdminDashboardCustomers(
              element[0],
              element[1],
              element[2],
              element[3],
              element[4],
              element[5]
            );
            this.customers.push(p);
          });

        }
        else if (res.Response == "EMPTY") {
          this.errorMessage = "No Customer Available!";
          this.noCustomer = true;
        }
        else {
          this.noCustomer = true;
          this.errorMessage = "Server Error!";
        }
      }
    );

  }

}
