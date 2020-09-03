import { Component, OnInit } from '@angular/core';
import { SecretaryService } from '../secretary.service';

@Component({
  selector: 'app-accepted-rv',
  templateUrl: './accepted-rv.component.html',
  styleUrls: ['./accepted-rv.component.css']
})
export class AcceptedRVComponent implements OnInit {

  constructor(private sec : SecretaryService ) { }
  Secretary;
  myid;
  RV_id;
  HerDocId;
  count_accepted = 0;
  ngOnInit(): void {
    this.Secretary =  JSON.parse(localStorage.getItem('secretary'));  
    this.myid = this.Secretary._id;
    this.HerDocId = this.Secretary.id_doctor._id
    this.listOwnRv(this.HerDocId);
  }

  myRV;
  listOwnRv(HerDocId){
    this.sec.ListRv(HerDocId).subscribe((data: any)=>{
      this.myRV = data;
      this.myRV.forEach(element => {
        if (element.statue) {
          this.count_accepted ++;
        }
      });
    })
  }
  

}
