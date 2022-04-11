import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-firstlunch',
  templateUrl: './firstlunch.page.html',
  styleUrls: ['./firstlunch.page.scss'],
})
export class FirstlunchPage implements OnInit {

  howpage = false;
  constructor(public router: Router ) {
    Storage.get({key:'fasttime'}).then(val=>{
        if(val.value)
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
async submit()
{
  Storage.set({key:'fasttime',value:'true'}).then(val=>{
    this.router.navigate(['/splash'],{ replaceUrl: true });
  });
}

}
