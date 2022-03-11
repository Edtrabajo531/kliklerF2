import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/front/home/home.component';
import { PlansComponent } from './components/admin/plans/plans.component';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component:HomeComponent },

  {
    path: 'administrar',component:AdminComponent,
    children: [
      {path:'planes',component:PlansComponent},
    ]
  },
 
  { path: '**', pathMatch: 'full', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }


