import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submenu1:boolean;
  userAuth:User;
  constructor(
    private router:Router,
    private authS:AuthService,
    ) { }

  ngOnInit(): void {
    this.userAuth = this.authS.getAuth();
    let url = this.router.url
    if(url.includes("cuentas-bancarias") || url.includes("carteras-bitcoins")){
      this.submenu1 = true;
    }else{
      this.submenu1 = false;
    }
    this.router.events.subscribe((event: Event) => {
     if (event instanceof NavigationEnd) {
          // Hide loading indicator
          if(event.url.includes("cuentas-bancarias") || event.url.includes("carteras-bitcoins")){
            this.submenu1 = true;
          }else{
            this.submenu1 = false;
          }
      }
  });
  }

  logout(){
    this.authS.logout();
  }
}
