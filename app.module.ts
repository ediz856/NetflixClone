import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { SinglePlayerComponent } from './views/single-player/single-player.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SettingsComponent } from './views/settings/settings.component';
import { SubscriptionComponent } from './views/subscription/subscription.component';
import { MyListComponent } from './views/my-list/my-list.component';
import { ToastrModule } from 'ngx-toastr';
import { TokenInterceptor } from './common/header-interceptor';
import { SettingsService } from './services/settings.service';
import { SettingsModel } from './models/settings.model';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { PageLayoutComponent } from './layouts/page-layout.component';
import { FormsModule } from '@angular/forms';
import { NgxPermissionsModule } from 'ngx-permissions';

import { CommonModule } from '@angular/common';
import { VgCoreModule } from "videogular2/core";
import { VgControlsModule } from "videogular2/controls";
import { VgOverlayPlayModule } from "videogular2/overlay-play";
import { VgBufferingModule } from "videogular2/buffering";

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PaymentPendingComponent } from './views/payment-pending/payment-pending.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export function initSettings(settingService: SettingsService): Function {
  return () => settingService.load();
}

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    SinglePlayerComponent,
    DashboardComponent,
    SettingsComponent,
    SubscriptionComponent,
    MyListComponent,
    LoginComponent,
    RegisterComponent,
    PageLayoutComponent,
    PaymentPendingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    NgbPaginationModule,
    NgbAlertModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule,
    AngularFontAwesomeModule,
    NgxPermissionsModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      progressBar: true
    }),
    CommonModule,
    VgCoreModule,
    VgControlsModule,
    VgOverlayPlayModule,
    VgBufferingModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    SettingsService,
    {
      provide: APP_INITIALIZER,
      useFactory: initSettings,
      deps: [SettingsService],
      multi: true
    },
    SettingsModel
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
