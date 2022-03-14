import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/front/home/home.component';
import { NavbarComponent } from './components/front/shared/navbar/navbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalRegisterComponent } from './components/front/shared/modal-register/modal-register.component';
import { ModalLoginComponent } from './components/front/shared/modal-login/modal-login.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { ToastrModule } from 'ngx-toastr';
import { LoaderComponent } from './components/front/shared/loader/loader.component';
import { ModalResendMailConfirmComponent } from './components/front/shared/modal-resend-mail-confirm/modal-resend-mail-confirm.component';

import { AdminComponent } from './components/admin/admin.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { DataTablesModule } from 'angular-datatables';
import { CreatePlanComponent } from './components/admin/plans/create-plan/create-plan.component';
import { EditPlanComponent } from './components/admin/plans/edit-plan/edit-plan.component';
import { DeletePlanComponent } from './components/admin/plans/delete-plan/delete-plan.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    ModalRegisterComponent,
    ModalLoginComponent,
    LoaderComponent,
    ModalResendMailConfirmComponent,
    PlansComponent,
    AdminComponent,
    CreatePlanComponent,
    EditPlanComponent,
    DeletePlanComponent,

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ maxOpened: 2, closeButton: true, autoDismiss: true, enableHtml: true, timeOut: 6000, positionClass: 'toast-bottom-center' }),
    HttpClientModule,
    DataTablesModule 
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
