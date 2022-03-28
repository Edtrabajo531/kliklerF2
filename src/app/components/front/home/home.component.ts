import { Component, HostListener, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { NgwWowService } from 'ngx-wow';
import { NavigationEnd, Router } from '@angular/router';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private wowSubscription: any;
  innerWidth: any;
 
  constructor( private wowService:NgwWowService,
    private router:Router,
    @Inject(PLATFORM_ID) private platformid: any
    ) {
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
  
      if(isPlatformBrowser(this.platformid)){
        this.innerWidth = window.innerWidth;
     }
  }
  

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    if(isPlatformBrowser(this.platformid)){
      this.innerWidth = window.innerWidth;
   }
    
  }

   ngOnDestroy() {
    this.wowSubscription.unsubscribe();
  }
  // sendToF
  
}
