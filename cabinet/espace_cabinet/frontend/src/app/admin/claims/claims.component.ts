import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import { claim } from 'src/app/claim.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-claims',
  templateUrl: './claims.component.html',
  styleUrls: ['./claims.component.css']
})
export class ClaimsComponent implements OnInit {

  constructor(private admin:AdminService) { }

  claims : claim [];
  searchClaim;
  emptyBool;
  ngOnInit(): void {
    this.loadAllClaims();
  }

  // List all claims
  loadAllClaims() {
    this.admin.getAllClaims().subscribe((data: claim []) => {
      this.claims = data;
      if (data.length > 0) {
        this.emptyBool = false;
      }else{
        this.emptyBool = true;
      }
    })
  }

  // Answer claim
  onSubmit(f: NgForm,id_claim) {
    this.admin.answerClaim(f.value,id_claim).subscribe(() => {
      this.loadAllClaims();
    });
  }

  // Delete claim
  deleteClaim(id_claim) {
    this.admin.deleteClaim(id_claim).subscribe(() => {
      this.loadAllClaims();
    });
  }
  

}
