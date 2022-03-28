import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  menuPlan:boolean;
  menuProducts:boolean;
  constructor(
    private router:Router
  ) { }

  ngOnInit(): void {

    let url = this.router.url
    if(url.includes("panel/mi-plan") || url.includes("panel/planes")){
      this.menuPlan = true;
    }else{
      this.menuPlan = false;
    }
    
    if(url.includes("panel/mi-plan") || url.includes("panel/planes")){
      this.menuProducts = true;
    }else{
      this.menuProducts = false;
    }
    
  this.router.events.subscribe((event:any) => {
     if (event instanceof NavigationEnd) {
          // Hide loading indicator
          if(event.url.includes("panel/mi-plan") || event.url.includes("panel/planes")){
            this.menuPlan = true;
          }else{
            this.menuPlan = false;
          }

          if(event.url.includes("panel/mis-publicaciones") || event.url.includes("panel/publicar-producto")){
            this.menuProducts = true;
          }else{
            this.menuProducts = false;
          }
      }
  });
  }

}
