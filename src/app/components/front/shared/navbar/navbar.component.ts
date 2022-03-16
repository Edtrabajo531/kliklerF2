import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {Location} from '@angular/common'; 

import {
  NgbModal,
  ModalDismissReasons,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})

export class NavbarComponent implements OnInit {
  loading = true;
  @ViewChild('modalLogin') modalLogin: ElementRef;
  @ViewChild('modalRegister') modalRegister: ElementRef;
  @ViewChild('modalResendMail') modalResendMail: ElementRef;
  userAuth:User;
  formLogin = false;
  formRegister = false;
  formResendMail = false;
  accountConfirmed = false;
  errorAccountConfirmed = false;

  constructor(
    private modalS: NgbModal,
    config: NgbModalConfig,
    private activatedR:ActivatedRoute,
    private location:Location,
    private router:Router,
    private authS:AuthService,
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
  }
  
  // reloadComponent() {
  //   let currentUrl = this.router.url;
  //       this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  //       this.router.onSameUrlNavigation = 'reload';
  //       this.router.navigate([currentUrl]);
  //   }

  ngOnInit(): void {
   
    this.activatedR.queryParams.subscribe(data=>{
      if(data['cuenta'] == "confirmada"){
        let self = this;
        self.accountConfirmed = true;
         setTimeout( function(){
          self.openLogin();
          self.location.replaceState("/");
         },500)
      }else if(data['cuenta'] == "no-confirmada"){
        this.errorAccountConfirmed = true;
        let self = this;
        setTimeout( function(){
          self.openResendMail();
          self.errorAccountConfirmed = true;
          self.location.replaceState("/");
         },500)
      }
    })
    this.userAuth = this.authS.getAuth();
    this.loading = false;
    if(this.userAuth?.id){
      this.getAuth();
    }
  }
  
  getAuth(){
    this.authS.getAuth();
  }

  logout(){
    this.authS.logout();
  }
  
  receiveChild(value: any) {
    
    if (value == 'showLoader') {
      this.loading = true;
    } else if (value == 'hideLoader') {
     
      this.loading = false;
    } else if (value == 'hideModal') {
      
      this.modalS.dismissAll();
      this.formLogin = false;
      this.formRegister = false;
      this.formResendMail = false;
      this.accountConfirmed = false;
      this.errorAccountConfirmed = false;
    } else if (value == 'showLogin') {
      this.modalS.dismissAll();
      this.openLogin();
    } else if (value == 'showRegister') {
      this.modalS.dismissAll();
      this.openRegister();
      this.accountConfirmed = false;
      this.errorAccountConfirmed = false;
    }else if(value == "modalResendEmail"){
      this.openResendMail();
      this.accountConfirmed = false;
      this.errorAccountConfirmed = false;
    }
  }

  openLogin() {
    this.formLogin = true;
    this.modalS
      .open(this.modalLogin, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'sm',
      })
      .result.then(
        (result) => {
          if (result === 'yes') {
          }
          this.formLogin = false;
          return;
        },
        (reason) => {
          this.formLogin = false;
          return;
        }
      );
      
      this.ngOnInit();
  }

  openRegister() {
    this.formRegister = true;
    this.modalS
      .open(this.modalRegister, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'md',
      })
      .result.then(
        (result) => {
          if (result === 'yes') {
          }
          this.formRegister = false;

          return;
        },
        (reason) => {
          this.formRegister = false;

          return;
        }
      );
  }

  openResendMail() {
    this.formResendMail = true;
    this.modalS
      .open(this.modalResendMail, {
        ariaLabelledBy: 'modal-basic-title',
        size: 'sm',
      })
      .result.then(
        (result) => {
          if (result === 'yes') {
          }
          this.formResendMail = false;
          return;
        },
        (reason) => {
          this.formResendMail = false;
          return;
        }
      );
  }
}
