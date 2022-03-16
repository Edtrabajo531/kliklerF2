import { Component, OnInit } from '@angular/core';
import { Router, Event, NavigationEnd, NavigationStart } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  submenu1:boolean;
  constructor(private router:Router) { }

  ngOnInit(): void {
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
}
