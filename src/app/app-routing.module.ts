import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { VotingReportComponent } from './components/voting-report/voting-report.component';
import { AuthGuard } from './auth/auth.guard';
import { PhoneComponent } from './components/phone/phone.component';
import { UsersComponent } from './components/users/users.component';
import { AdminAuthGuard } from './auth/adminAuth.guard';
import { PhoneAuthGuard } from './auth/phoneAuth.guard';


const routes: Routes = [
  {path: 'users', component:UsersComponent, canActivate: [AdminAuthGuard]},
  {path: 'phone', component:PhoneComponent, canActivate: [PhoneAuthGuard]},
  {path: 'update', component:VotingReportComponent, canActivate: [AuthGuard]},
  {path: '', component:LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
