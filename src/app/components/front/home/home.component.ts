import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { filter, Subscription } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private wowSubscription: any;
  constructor( private wowService:NgwWowService,private router:Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.wowService.init();
    });
    
   }

  ngOnInit(): void {
    
    this.wowSubscription = this.wowService.itemRevealed$.subscribe(
      (item:HTMLElement) => {
        // do whatever you want with revealed element
      });
  }
  

   ngOnDestroy() {
    this.wowSubscription.unsubscribe();
  }
  // sendToF
}
