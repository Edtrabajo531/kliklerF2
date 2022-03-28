import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-products-recent',
  templateUrl: './slider-products-recent.component.html',
  styleUrls: ['./slider-products-recent.component.css']
})
export class SliderProductsRecentComponent implements OnInit {

  categories:any;
  constructor() { }
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
     nav: true,
    
    navText : ["<i class='fas fa-arrow-left'></i>","<i class='fas fa-arrow-right'></i>"],
    
    responsive: {
      0: {
        items: 1
      },
      450: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    // <576px
    // Small	sm	≥576px
    // Medium	md	≥768px
    // Large	lg	≥992px
    // Extra large	xl	≥1200px
    // Extra extra large	xxl	≥1400px
  }
  ngOnInit(): void {
  }

}
