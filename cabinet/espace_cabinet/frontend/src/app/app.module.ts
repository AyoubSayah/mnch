import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {ReactiveFormsModule } from '@angular/forms'
import { FlashMessagesModule } from 'angular2-flash-messages';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

// search module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { SecretariesComponent } from './admin/secretaries/secretaries.component';

// Admin Imports 
import { LandingComponent } from './landing/landing.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { DoctorsComponent } from './admin/doctors/doctors.component';
import { PatientsComponent } from './admin/patients/patients.component';
import { ClaimsComponent } from './admin/claims/claims.component';

// Doctor Imports 
import { LayoutDoctorComponent } from './doctor/layout/layout.component';
import { HomeComponent } from './doctor/home/home.component';
import { SecretariesDoctorComponent } from './doctor/secretaries/secretaries.component';
import { LayoutSecComponent } from './secretary/layout-sec/layout-sec.component';
import { HomeSecComponent } from './secretary/home-sec/home-sec.component';
import { RendezvousSecComponent } from './secretary/rendezvous-sec/rendezvous-sec.component';
import { MessagesComponent } from './doctor/messages/messages.component';
import { ConsultationsComponent } from './doctor/consultations/consultations.component';
import { ArchivedConsComponent } from './doctor/archived-cons/archived-cons.component';
import { AcceptedRVComponent } from './secretary/accepted-rv/accepted-rv.component';
import { CanceledRVComponent } from './secretary/canceled-rv/canceled-rv.component';
import { CaisseComponent } from './doctor/caisse/caisse.component';
import { AppoisComponent } from './doctor/appois/appois.component';

registerLocaleData(localeFr, 'fr');
const appRoutes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'admin', component: LayoutComponent,
    children: [
      {
        path: 'dashboard', // child route path
        component: DashboardComponent // child route component that the router renders
      },
      {
        path: 'doctors', 
        component: DoctorsComponent
      },
      {
        path: 'secretaries', 
        component: SecretariesComponent
      },
      {
        path: 'patients', 
        component: PatientsComponent
      },
      {
        path: 'claims',
        component: ClaimsComponent
      }
    ]
  },
  { path : 'doctor' , component : LayoutDoctorComponent,
    children: [
      {
        path: 'home/:id',
        component: HomeComponent
      },
      {
        path: 'secretaries',
        component: SecretariesDoctorComponent
      },
      {
        path: 'messages',
        component: MessagesComponent
      },
      {
        path: 'appointments',
        component: AppoisComponent
      },
      {
        path: 'consultations',
        component: ConsultationsComponent
      },
      {
        path: 'archivedcons',
        component: ArchivedConsComponent
      },
      {
        path: 'caisse',
        component: CaisseComponent
      }
    ]
  },
  { path : 'secretary' , component : LayoutSecComponent , children : [
    { path  : 'home/:id' , component : HomeSecComponent},
    { path  : 'Rendezvous' , component : RendezvousSecComponent},
    { path  : 'acceptedRV' , component : AcceptedRVComponent},
    { path  : 'canceledRV' , component : CanceledRVComponent}
  ]}  
];


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    DashboardComponent,
    LayoutComponent,
    DoctorsComponent,
    SecretariesComponent,
    PatientsComponent,
    ClaimsComponent,
    HomeComponent,
    LayoutDoctorComponent,
    SecretariesDoctorComponent,
    LayoutSecComponent,
    HomeSecComponent,
    RendezvousSecComponent,
    MessagesComponent,
    ConsultationsComponent,
    ArchivedConsComponent,
    AcceptedRVComponent,
    CanceledRVComponent,
    CaisseComponent,
    AppoisComponent
  ],
  imports: [
    SweetAlert2Module.forRoot(),

    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule.forRoot(),
    HttpClientModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
