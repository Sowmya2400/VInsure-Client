import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminExInfo } from 'src/app/Models/Admin-ExInfo';

@Component({
  selector: 'app-view-file',
  templateUrl: './view-file.component.html',
  styleUrls: ['./view-file.component.css']
})
export class ViewFileComponent implements OnInit {

  image: any = AdminExInfo.documentFile

  constructor(private router: Router) { }

  ngOnInit(): void {
    if(!AdminExInfo.loggedIn){
      this.router.navigate([''])
    }
  }

  route(){
    this.router.navigate(['admin-dashboard/claim-list'])
  }

}
