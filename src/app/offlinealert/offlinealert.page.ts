import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { track } from '../model/track';

@Component({
  selector: 'app-offlinealert',
  templateUrl: './offlinealert.page.html',
  styleUrls: ['./offlinealert.page.scss'],
})
export class OfflinealertPage implements OnInit {

  constructor(public modalCtrl : ModalController, public storage : Storage, private router: Router, private api: ApiService) { }

  offlinebutton = false;
  ngOnInit() {
    this.storage.get('download').then((val: track[])=>{
      if(val)
      {
        this.offlinebutton  = true
      }
    })
  }
  offline()
  {
     this.modalCtrl.dismiss({offline : true})
  }
  retry()
  {
    this.api.slider().subscribe(data => {
      this.modalCtrl.dismiss({offline : false})
      this.router.navigate(['/'])
    })
  }
}
