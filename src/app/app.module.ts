import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { ResultComponent } from './components/result/result.component';

import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { VotingReportComponent } from './components/voting-report/voting-report.component';
import { PhoneComponent } from './components/phone/phone.component';
import { UsersComponent } from './components/users/users.component';
import { CreateVoterComponent } from './components/create-voter/create-voter.component';
import { PhoneListComponent } from './components/phone-list/phone-list.component';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { VotersReportComponent } from './components/voters-report/voters-report.component';
import { CircleReportComponent } from './components/circle-report/circle-report.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    ResultComponent,
    LoginComponent,
    VotingReportComponent,
    PhoneComponent,
    UsersComponent,
    CreateVoterComponent,
    PhoneListComponent,
    VotersReportComponent,
    CircleReportComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    Ng2SmartTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
