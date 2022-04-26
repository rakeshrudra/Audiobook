import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { ApiService } from '../api.service';
import { track } from '../model/track';
import { Storage } from '@capacitor/storage';
@Component({
  selector: 'app-offlinealert',
  templateUrl: './offlinealert.page.html',
  styleUrls: ['./offlinealert.page.scss'],
})
export class OfflinealertPage implements OnInit {

  constructor(public modalCtrl : ModalController,  private router: Router, private api: ApiService) { }

  offlinebutton = false;
 async ngOnInit() {
    await Storage.get({key:'download'}).then((val)=>{
      if(val.value)
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
