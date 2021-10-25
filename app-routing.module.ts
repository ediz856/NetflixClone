import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SinglePlayerComponent } from './views/single-player/single-player.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PageLayoutComponent } from './layouts/page-layout.component';
import { GuardService } from './services/guard.service';
import { SettingsComponent } from './views/settings/settings.component';
import { MyListComponent } from './views/my-list/my-list.component';
import { PaymentPendingComponent } from './views/payment-pending/payment-pending.component';

export const routes: Routes = [
  {
    path: "",
    component: PageLayoutComponent,
    canActivate: [GuardService],
    children: [
      {
        path: "dashboard",
        component: DashboardComponent,
        data: { title: "Dashboard" }
      },
      {
        path: "settings",
        component: SettingsComponent,
        data: { title: "Settings" }
      },
      {
        path: "my-list",
        component: MyListComponent,
        data: { title: "MyList" }
      },
      {
        path: "payment-pending",
        component: PaymentPendingComponent,
        data: { title: "Payment Pending" }
      },
      {
        path: "movie/:id",
        component: SinglePlayerComponent,
        data: { title: "Customer" }
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full",
        data: { title: "Dashboard" }
      }
    ]
  },
  {
    path: "",
    component: LoginComponent,
    children: [{ path: "login", component: LoginComponent }]
  },
  {
    path: "",
    component: RegisterComponent,
    children: [{ path: "register", component: RegisterComponent }]
  },
  { path: "**", redirectTo: "dashboard" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
