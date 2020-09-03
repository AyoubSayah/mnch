import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { Router } from '@angular/router';
import { claim } from 'src/app/claim.model';
import { patient } from 'src/app/patient.model';
import { doctor } from 'src/app/doctor.model';
import { secretary } from 'src/app/secretary.model';
import { appois } from 'src/app/appois.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  patients;
  claims;
  doctors;
  secretaries;
  appoientments;
  acceptedAppoi = 0;
  awaitedAppo = 0;
  constructor(private admin:AdminService,private router:Router) { }
  ngOnInit(): void {
    this.loadAllClaims();
    this.loadAllPatients();
    this.loadAllDoctors();
    this.loadAllSecretaries();
    this.loadAllAppointments(); 
  }

  loadAllClaims() {
    this.admin.getAllClaims().subscribe((data: claim []) => {
      this.claims = data.length;
    })
  }
  loadAllPatients() {
    this.admin.getAllPatients().subscribe((data: patient []) => {
      this.patients = data.length;
    })
  }
  loadAllDoctors() {
    this.admin.getAlldoctors().subscribe((data: doctor []) => {
      this.doctors = data.length;
    })
  }
  loadAllSecretaries() {
    this.admin.getAllSecretaries().subscribe((data: secretary []) => {
      this.secretaries = data.length;
    })
  }
  loadAllAppointments() {
    this.admin.getAllappois().subscribe((data: appois []) => {
      data.forEach(appoi => {
        if (appoi.statue) {
          this.acceptedAppoi ++; 
        }else{
          this.awaitedAppo ++;
        }
      });
      this.appoientments = data.length;
    })
  }

}
