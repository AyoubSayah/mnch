import { Component, OnInit } from '@angular/core';
import { DoctorService } from '../doctor.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { doctor } from 'src/app/doctor.model';
import { NgForm } from '@angular/forms';
import { AdminService } from '../../admin/admin.service';
import { notif } from 'src/app/notif.model';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutDoctorComponent implements OnInit {

  routeSub;
  doctor_id;
  doctor_name;
  myDoctor: doctor;
  alert;
  notifs : notif[];
  new_notifs = 0;
  constructor(
    private doctor : DoctorService,
    private route: ActivatedRoute,
    private router: Router,
    private admin:AdminService) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
    this.myDoctor =  JSON.parse(localStorage.getItem('doctor'));  
    this.doctor_name = this.myDoctor.nom;
    this.loadAllNotifs();
  }
  logout() {
    localStorage.clear();
  }
  loadAllNotifs() {
    this.admin.getNotifsById(this.myDoctor._id).subscribe((data: notif []) => {
      this.notifs = data;
      data.forEach(element => {
        if (element.new) {
          this.new_notifs ++;
        }
      });
    });
  }

  UpdateNotif() {
    this.admin.updateNotifById(this.myDoctor._id).subscribe((data: notif []) => {
      this.loadAllNotifs();
      this.new_notifs = 0;
    });
  }

  onUpdateDoctor(f:NgForm) {
    f.value._id = this.myDoctor._id;
    f.value.man = this.myDoctor.man;
    if (f.value.newPassword != '') {
      f.value.password = f.value.newPassword;
    }
    delete f.value.newPassword;
    if (f.value.password != '') {
      this.doctor.UpateDoctor(f.value).subscribe((data: any) => {
        localStorage.setItem('doctor', JSON.stringify(data)); 
        window.location.reload()
      });
    }else{
      this.alert = 'Veuiller écrire votre ancien mot de passe pour effectuer le changement';
    }
    
  }

}
