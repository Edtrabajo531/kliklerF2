import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  slug:any;
  post:any;
  images:any = [];
  posts = [
    {id:1,slug:'refrigeradora-lg',name:"Refrigeradora LG Inverter Cromada 6261lts 21 Pies 2 Puertas",price:"800",images:[
    
      {src:'assets/images/posts/test/Nevera/1.webp'},
      {src:'assets/images/posts/test/Nevera/2.webp'},
      {src:'assets/images/posts/test/Nevera/3.webp'},
      {src:'assets/images/posts/test/Nevera/4.webp'},
      {src:'assets/images/posts/test/Nevera/5.webp'},
      {src:'assets/images/posts/test/Nevera/6.webp'},

    ]},
    {id:1,slug:'zapatos-coverse-diversas-tallas-y-colores',name:"Zapatos coverse diversas tallas y colores",price:"100",images:[
   
      {src:'assets/images/posts/test/zapatos/z1.webp'},
      {src:'assets/images/posts/test/zapatos/z2.webp'},
      {src:'assets/images/posts/test/zapatos/z3.webp'},
      {src:'assets/images/posts/test/zapatos/z4.webp'},
      {src:'assets/images/posts/test/zapatos/z5.webp'},
      {src:'assets/images/posts/test/zapatos/z6.webp'},
       
    ]},
    {id:1,slug:'flamante-captiva-sport-2016',name:"Flamante Captiva Sport V6 3.0 Año 2016",price:"17.700",images:[
   
      {src:'assets/images/posts/test/camioneta/1.webp'},
      {src:'assets/images/posts/test/camioneta/2.webp'},
      {src:'assets/images/posts/test/camioneta/3.webp'},
    
      {src:'assets/images/posts/test/camioneta/5.webp'},
      
      {src:'assets/images/posts/test/camioneta/7.webp'},
       
    ]},
    {id:1,slug:'fpc-audífonos-logitech-g435',name:"Fpc Audífonos Con Micrófono Logitech G435",price:"99",images:[
   
      {src:'assets/images/posts/test/audifonos/1.webp'},
      {src:'assets/images/posts/test/audifonos/2.webp'},
      {src:'assets/images/posts/test/audifonos/3.webp'},
    
      {src:'assets/images/posts/test/audifonos/5.webp'},
      
      {src:'assets/images/posts/test/audifonos/7.webp'},
       
    ]}
    

  ];

  constructor(private activatedR: ActivatedRoute,
    private router:Router) { }

  ngOnInit(): void {
   
      this.activatedR.paramMap.subscribe((params:any)=>{
       
        
        this.slug = params.params.slug;
        this.post = this.posts.filter(
          (p: any) => p.slug == this.slug
        );
        
        if(this.post.length == 0){
          this.router.navigateByUrl('/');
         
       }
        this.post = this.post[0];
          
        this.galleryImages = [];
    
        for (let img of this.post.images) {
          let src = img.src;
    
          const info_image = {
            small: src,
            medium: src,
            big: src,
          };
    
          this.galleryImages.push(info_image);
        }
      })
    
    
    this.galleryOptions = [
      {
        width: '100%',
        height: '600px',
        imageSize: "contain",
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        imageInfinityMove:true,
        previewInfinityMove:true,
       
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];
    

 
    
    
   
    

  }
  
}
