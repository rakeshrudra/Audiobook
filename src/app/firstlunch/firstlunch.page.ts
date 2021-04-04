import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-firstlunch',
  templateUrl: './firstlunch.page.html',
  styleUrls: ['./firstlunch.page.scss'],
})
export class FirstlunchPage implements OnInit {

  howpage = false;
  constructor(public router: Router, public storage : Storage ) {
    this.storage.get('fasttime').then(val=>{
        if(val)
        {
          this.router.navigate(['/splash'],{ replaceUrl: true });
        }else
        {
          this.howpage = true
        }
    })
   }

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    spaceBetween: 0,
    watchSlidesProgress: true,
    slidesPerView: 1,
    slidesPerColumn: 1,
    autoplay: {
      delay: 6000,
    },
  };

  ngOnInit() {
  }
submit()
{
  this.storage.set('fasttime','true').then(val=>{
   this.router.navigate(['/splash'],{ replaceUrl: true });
  });
}

}
