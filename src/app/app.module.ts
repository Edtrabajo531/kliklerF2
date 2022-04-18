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
import { ActivatePlanComponent } from './components/front/activate-plan/activate-plan.component';
import { BankAccountsComponent } from './components/admin/bank-accounts/bank-accounts.component';
import { ModalCreateBankComponent } from './components/admin/bank-accounts/modal-create-bank/modal-create-bank.component';
import { ModalEditBankComponent } from './components/admin/bank-accounts/modal-edit-bank/modal-edit-bank.component';
import { WalletsComponent } from './components/admin/wallets/wallets.component';
import { CreateWalletComponent } from './components/admin/wallets/create-wallet/create-wallet.component';
import { EditWalletComponent } from './components/admin/wallets/edit-wallet/edit-wallet.component';
import { FormDatosUsuarioComponent } from './components/form-datos-usuario/form-datos-usuario.component';
import { EditLisenceComponent } from './components/admin/plans/edit-lisence/edit-lisence.component';
import { AddDataUserComponent } from './components/front/add-data-user/add-data-user.component';
import { AddDataContactComponent } from './components/front/add-data-user/add-data-contact/add-data-contact.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { InsertAmountComponent } from './components/front/activate-plan/insert-amount/insert-amount.component';
import { DetailPlanuserComponent } from './components/front/activate-plan/detail-planuser/detail-planuser.component';
import { SelectAccountsPaymentComponent } from './components/front/activate-plan/select-accounts-payment/select-accounts-payment.component';
import { UploadsDocumentsComponent } from './components/front/activate-plan/uploads-documents/uploads-documents.component';
import { DropFileDirective } from './directives/drop-file.directive';
import { LightboxModule } from 'ngx-lightbox';
import { FooterComponent } from './components/front/shared/footer/footer.component';
import { PlanReviewComponent } from './components/front/shared/plan-review/plan-review.component';
import { UserplanComponent } from './components/admin/userplan/userplan.component';
import { CheckplanComponent } from './components/admin/userplan/checkplan/checkplan.component';
import { MyPlanComponent } from './components/front/my-plan/my-plan.component';
import { SaldoComponent } from './components/front/saldo/saldo.component';
import { PanelComponent } from './components/front/panel/panel.component';
import { PostProductComponent } from './components/front/panel/post-product/post-product.component';
import { PostsComponent } from './components/front/panel/posts/posts.component';
import { NgwWowModule } from 'ngx-wow';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { DetailsComponent } from './components/front/post/details/details.component';
import { SliderCategoriesComponent } from './components/front/home/slider-categories/slider-categories.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { SliderProductsRecentComponent } from './components/front/home/slider-products-recent/slider-products-recent.component';
import { CoinsComponent } from './components/admin/coins/coins.component';
// import { CoinsComponent } from './components/admin/coins/coins.component';
// import { ModalCreateCoinComponent } from './components/admin/coins/modal-create-coin/modal-create-coin.component';
// import { ModalEditCoinComponent } from './components/admin/coins/modal-edit-coin/modal-edit-coin.component';

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
    ActivatePlanComponent,
    BankAccountsComponent,
    ModalCreateBankComponent,
    ModalEditBankComponent,
    WalletsComponent,
    CreateWalletComponent,
    EditWalletComponent,
    FormDatosUsuarioComponent,
    EditLisenceComponent,
    AddDataUserComponent,
    AddDataContactComponent,
    InsertAmountComponent,
    DetailPlanuserComponent,
    SelectAccountsPaymentComponent,
    UploadsDocumentsComponent,
    DropFileDirective,
    FooterComponent,
    PlanReviewComponent,
    UserplanComponent,
    CheckplanComponent,
    MyPlanComponent,
    SaldoComponent,
    PanelComponent,
    PostProductComponent,
    PostsComponent,
    DetailsComponent,
    SliderCategoriesComponent,
    SliderProductsRecentComponent,
    CoinsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ maxOpened: 2, closeButton: true, autoDismiss: true, enableHtml: true, timeOut: 6000, positionClass: 'toast-bottom-center' }),
    HttpClientModule,
    DataTablesModule,
    NgxIntlTelInputModule,
    LightboxModule,
    NgwWowModule,
    HttpClientModule, 
    NgxGalleryModule,
    RouterModule,
    BrowserAnimationsModule,
    CarouselModule
  
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
