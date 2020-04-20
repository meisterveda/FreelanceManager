import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';



import { FlexLayoutModule } from '@angular/flex-layout';

import { MatSidenavModule } from '@angular/material/sidenav';

import { BlocksModule } from './_blocks/blocks.module';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { JobsComponent } from './modules/jobs/jobs.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { AdministrationComponent } from './modules/administration/administration.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { LoginComponent } from './modules/login/login.component';
import { LogoutComponent } from './modules/logout/logout.component';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    JobsComponent,
    MessagesComponent,
    ProjectsComponent,
    AdministrationComponent,
    AboutComponent,
    HelpComponent,
    SettingsComponent,
    ProfileComponent,
    HomeComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BlocksModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatSidenavModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
