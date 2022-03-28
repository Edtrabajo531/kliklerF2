import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { UserplanService } from '../../../../services/front/userplan.service';

import { Lightbox } from 'ngx-lightbox';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-checkplan',
  templateUrl: './checkplan.component.html',
  styleUrls: ['./checkplan.component.css'],
})

export class CheckplanComponent implements OnInit {
  @Input() plan_id: any;
  images: any;
  userplan: any;
  user: User;
  loading = true;
  reject = false;
  @ViewChild('reject_message') reject_message: ElementRef;
  @Output() sendToF = new EventEmitter<any>();
  constructor(
    private userplanS: UserplanService,
    private _lightbox: Lightbox
  ) {}

  sendToFather(message: any) {
    this.sendToF.emit(message);
  }

  ngOnInit(): void {
    this.userplanS.getAdmin(this.plan_id).subscribe((data: any) => {
      this.userplan = data.userplan;
      this.user = data.user;
      this.loading = false;
      this.images = data.images;
      this.images = [];
      for (let img of data.images) {
        let src = img.url_path;
        let caption = '';
        let thumb = img.url_path;
        let id = img.id;

        const info_image = {
          src: src,
          caption: caption,
          thumb: thumb,
          id: id,
        };

        this.images.push(info_image);
      }
      this.sendToFather('hideLoader');
    });
  }

  open(index: number): void {
    this._lightbox.open(this.images, index);
  }

  close(): void {
    this._lightbox.close();
  }

  activatePlan(id: any) {
    this.sendToFather('showLoader');
    this.userplanS.activatePlan(id).subscribe((data: any) => {
      this.sendToFather('newData');
    });
  }

  rejectPlan(id: any) {
    this.sendToFather('showLoader');
    
   
    
    this.userplanS.rejectPlan(id,this.reject_message.nativeElement.value).subscribe((data: any) => {
      this.sendToFather('newData');
    });
  }

  
  jsonDecode(item:any) {
    return JSON.parse(item);
  }
}
