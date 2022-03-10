import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/front/home/home.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component:HomeComponent },

  // {
  //   path: 'administrar',component: PanelAdminComponent,
  //   children: [
  //     {path:'clientes',component:ClientsComponent},
  //   ]
  // },
 

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', initialNavigation: 'enabled' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }


