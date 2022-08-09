import { Component} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router} from '@angular/router';
import { AdminExInfo } from './Models/Admin-ExInfo';
import { ExInfo } from './Models/Ex-Info';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = ExInfo.title;

  constructor(private titleService:Title, private router: Router){
    this.titleService.setTitle(this.title);
  }

  ngOnInit(): void {
    ExInfo.loggedIn = false;
    AdminExInfo.loggedIn = false;
    if(ExInfo.loggedIn){
      this.router.navigate(['dashboard'])
    }
    else if(AdminExInfo.loggedIn){
      this.router.navigate(['admin-dashboard'])
    }
  }

}
