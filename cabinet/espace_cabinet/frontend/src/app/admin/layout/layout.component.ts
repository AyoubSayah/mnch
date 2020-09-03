import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { notif } from 'src/app/notif.model';
declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor(private admin:AdminService) { }

  notifs : notif[];
  new_notifs = 0;
  ngOnInit(): void {
    this.loadAllNotifs();
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

  loadAllNotifs() {
    this.admin.getAllNotifs().subscribe((data: notif []) => {
      this.notifs = data;
      data.forEach(element => {
        if (element.new) {
          this.new_notifs ++;
        }
      });
    });
  }

  UpdateNotif() {
    this.admin.UpdateNotif().subscribe((data: notif []) => {
      this.loadAllNotifs();
      this.new_notifs = 0;
    });
  }
}
