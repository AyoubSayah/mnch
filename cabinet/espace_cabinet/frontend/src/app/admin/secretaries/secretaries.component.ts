import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { secretary } from '../../secretary.model';
import {NgForm} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-secretaries',
  templateUrl: './secretaries.component.html',
  styleUrls: ['./secretaries.component.css']
})
export class SecretariesComponent implements OnInit {

  constructor(private admin:AdminService) { }

  secretaries : secretary [];
  searchSecretary;
  mySecretary: secretary;
  emptyBool;
  modify = false;

  ngOnInit(): void {
    this.loadAllSecretaries();
  }

  loadAllSecretaries() {
    this.admin.getAllSecretaries().subscribe((data: secretary []) => {
      this.secretaries = data;
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

  // Click to show doctor informations 
  SecretaryInfo(Secretary) {
    this.mySecretary = Secretary;
  }

   // Delete secretary by id
  deleteD(id) {
    this.admin.deleteSecretary(id).subscribe(() => {
      this.loadAllSecretaries();
      $('#SecretaryModal').modal('hide');
    })
  }

}
