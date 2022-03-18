import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/front/home/home.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { AdminComponent } from './components/admin/admin.component';
import { SelectPlanComponent } from './components/front/select-plan/select-plan.component';
import { ActivatePlanComponent } from './components/front/activate-plan/activate-plan.component';
import { BankAccountsComponent } from './components/admin/bank-accounts/bank-accounts.component';
import { WalletsComponent } from './components/admin/wallets/wallets.component';
import { AddDataUserComponent } from './components/front/add-data-user/add-data-user.component';
import { AddDataContactComponent } from './components/front/add-data-user/add-data-contact/add-data-contact.component';
import { InsertAmountComponent } from './components/front/activate-plan/insert-amount/insert-amount.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'planes', pathMatch: 'full', component: SelectPlanComponent },
 
  {
    path: 'activar-plan/:id',
    component: ActivatePlanComponent,
    // children: [
    //   { path: 'datos-personales', component: AddDataUserComponent },
    //   { path: 'datos-contacto', component: AddDataContactComponent },
    //   { path: 'insertar-monto', component: InsertAmountComponent },
      
    //   // { path: 'insert-usuario', component: HomeComponent },
    // ]
  },
  {
    path: 'administrar',
    component: AdminComponent,
    children: [
      { path: 'planes', component: PlansComponent },
      { path: 'cuentas-bancarias', component: BankAccountsComponent },
      { path: 'carteras-bitcoins', component: WalletsComponent },
    ],
  },
  { path: '**', pathMatch: 'full', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      initialNavigation: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
