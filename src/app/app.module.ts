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
import { SelectPlanComponent } from './components/front/select-plan/select-plan.component';
import { StepP2Component } from './components/front/select-plan/step-p2/step-p2.component';
import { ActivePlanComponent } from './components/front/active-plan/active-plan.component';
import { ActiveP2Component } from './components/front/active-plan/active-p2/active-p2.component';
import { ActiveP3Component } from './components/front/active-plan/active-p3/active-p3.component';
import { ActivatePlanComponent } from './components/front/activate-plan/activate-plan.component';
import { BankAccountsComponent } from './components/admin/bank-accounts/bank-accounts.component';
import { ModalCreateBankComponent } from './components/admin/bank-accounts/modal-create-bank/modal-create-bank.component';
import { ModalEditBankComponent } from './components/admin/bank-accounts/modal-edit-bank/modal-edit-bank.component';
import { WalletsComponent } from './components/admin/wallets/wallets.component';
import { CreateWalletComponent } from './components/admin/wallets/create-wallet/create-wallet.component';
import { EditWalletComponent } from './components/admin/wallets/edit-wallet/edit-wallet.component';
import { FormDatosUsuarioComponent } from './components/form-datos-usuario/form-datos-usuario.component';
import { EditLisenceComponent } from './components/admin/plans/edit-lisence/edit-lisence.component';

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
    SelectPlanComponent,
    StepP2Component,
    ActivePlanComponent,
    ActiveP2Component,
    ActiveP3Component,
    ActivatePlanComponent,
    BankAccountsComponent,
    ModalCreateBankComponent,
    ModalEditBankComponent,
    WalletsComponent,
    CreateWalletComponent,
    EditWalletComponent,
    FormDatosUsuarioComponent,
    EditLisenceComponent
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
