import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/front/home/home.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { AdminComponent } from './components/admin/admin.component';
import { SelectPlanComponent } from './components/front/select-plan/select-plan.component';
import { ActivatePlanComponent } from './components/front/activate-plan/activate-plan.component';
import { BankAccountsComponent } from './components/admin/bank-accounts/bank-accounts.component';
import { WalletsComponent } from './components/admin/wallets/wallets.component';
import { ActivePlanComponent } from './components/front/active-plan/active-plan.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'planes', pathMatch: 'full', component: SelectPlanComponent },
 
  {
    path: 'activar-plan/:id',
    component: ActivePlanComponent,
    children: [
      { path: 'datos-usuario', component: HomeComponent },
    ]
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
