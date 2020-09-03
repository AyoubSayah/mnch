import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../admin/admin.service';
import { notif } from 'src/app/notif.model';
declare var $: any;
@Component({
  selector: 'app-layout-sec',
  templateUrl: './layout-sec.component.html',
  styleUrls: ['./layout-sec.component.css']
})
export class LayoutSecComponent implements OnInit {

  constructor(private admin:AdminService) { }
  Secretary;
  name;
  myid;
  notifs : notif[];
  new_notifs = 0;
  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });

    this.Secretary =  JSON.parse(localStorage.getItem('secretary'));  
    this.name = this.Secretary.nom;
    this.myid = this.Secretary._id;
    this.loadAllNotifs();
  }

  loadAllNotifs() {
    this.admin.getNotifsById(this.Secretary._id).subscribe((data: notif []) => {
      this.notifs = data;
      data.forEach(element => {
        if (element.new) {
          this.new_notifs ++;
        }
      });
    });
  }

  UpdateNotif() {
    this.admin.updateNotifById(this.Secretary._id).subscribe((data: notif []) => {
      this.loadAllNotifs();
      this.new_notifs = 0;
    });
  }

}
