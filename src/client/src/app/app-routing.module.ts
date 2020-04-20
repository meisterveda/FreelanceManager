import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { JobsComponent } from './modules/jobs/jobs.component';
import { MessagesComponent } from './modules/messages/messages.component';
import { ProjectsComponent } from './modules/projects/projects.component';
import { AdministrationComponent } from './modules/administration/administration.component';
import { AboutComponent } from './pages/about/about.component';
import { HelpComponent } from './pages/help/help.component';
import { SettingsComponent } from './modules/settings/settings.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { LoginComponent } from './modules/login/login.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { AuthGuard } from './_helpers/auth.guard';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'jobs', component: JobsComponent, canActivate: [AuthGuard] },
  { path: 'messages', component: MessagesComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdministrationComponent, canActivate: [AuthGuard] },
  { path: 'about', component: AboutComponent },
  { path: 'help', component: HelpComponent },
  { path: 'settings', component: SettingsComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
