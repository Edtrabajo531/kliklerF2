import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-slider-categories',
  templateUrl: './slider-categories.component.html',
  styleUrls: ['./slider-categories.component.css']
})
export class SliderCategoriesComponent implements OnInit {
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
   
  }
  ngOnInit(): void {
  }

}
