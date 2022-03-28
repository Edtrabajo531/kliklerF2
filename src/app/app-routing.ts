import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/front/home/home.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { AdminComponent } from './components/admin/admin.component';
import { SelectPlanComponent } from './components/front/select-plan/select-plan.component';
import { ActivatePlanComponent } from './components/front/activate-plan/activate-plan.component';
import { BankAccountsComponent } from './components/admin/bank-accounts/bank-accounts.component';
import { WalletsComponent } from './components/admin/wallets/wallets.component';
import { PlanReviewComponent } from './components/front/shared/plan-review/plan-review.component';
import { UserplanComponent } from './components/admin/userplan/userplan.component';
import { MyPlanComponent } from './components/front/my-plan/my-plan.component';
import { SaldoComponent } from './components/front/saldo/saldo.component';
import { PanelComponent } from './components/front/panel/panel.component';
import { PostsComponent } from './components/front/panel/posts/posts.component';
import { PostProductComponent } from './components/front/panel/post-product/post-product.component';
import { DetailsComponent } from './components/front/post/details/details.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  
  { path: 'detalles-publicacion/:slug', pathMatch: 'full', component: DetailsComponent },
  { path: 'plan-en-revision', pathMatch: 'full', component: PlanReviewComponent },
  
  
  {
    path: 'panel',
    component: PanelComponent,
    children: [
      { path: 'saldo', component: SaldoComponent },
      { path: 'mi-plan', pathMatch: 'full', component: MyPlanComponent },
      { path: 'planes', pathMatch: 'full', component: SelectPlanComponent },
      { path: 'mis-publicaciones', pathMatch: 'full', component: PostsComponent },
      { path: 'publicar-producto', pathMatch: 'full', component: PostProductComponent },

     
    ],
  },

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
      { path: 'planes-usuarios', component: UserplanComponent },
      { path: 'cuentas-bancarias', component: BankAccountsComponent },
      { path: 'carteras-bitcoins', component: WalletsComponent },
    ],
  },
  { path: 'admin', pathMatch: 'full', redirectTo: 'administrar/planes' },
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
