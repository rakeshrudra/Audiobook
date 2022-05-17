import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from '../api.service';

import { Market } from '@ionic-native/market/ngx';
import { Storage } from '@capacitor/storage';
import { Device } from '@capacitor/device';
//import { AppVersion } from '@ionic-native/app-version/ngx';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.page.html',
  styleUrls: ['./menulist.page.scss'],
})
export class MenulistPage implements OnInit {

  constructor(public  router : Router , private market: Market, public platform : Platform, public api : ApiService) {
  /*  this.appVersion.getVersionNumber().then(e => {
        this.app = e;
    })*/
  }
  app;
  public appPages = [
    {
      title: 'Zakat Calculator',
      url: '/zakat-pay',
      icon: 'cash-outline'
    }
    ,
    {
      title: 'Salah Timing',
      url: '/prayer-time',
      icon: 'timer-outline'
    }
    ,
    {
      title: 'About Us',
      url: '/tab/menu/aboutus',
      icon: 'information-circle'
    }
    ,
    {
      title: 'Favourite',
      url: '/tab/menu/favourite',
      icon: 'heart'
    } ,
    {
      title: 'History',
      url: '/tab/menu/history',
      icon: 'apps'
    }  ,
    {
      title: 'Download List',
      url: '/tab/menu/download',
      icon: 'cloud-download'
    },
   /* {
      title: 'Notification',
      url: '/tab/menu/notification',
      icon: 'megaphone'
    }  ,*/
    {
      title: 'Feedback',
      url: '/tab/menu/feedback',
      icon: 'at'
    },

    {
      title: 'FAQ',
      url: '/faq',
      icon: 'chatbubbles'
    }
,    {
  title: 'Social Network',
  url: '/social',
  icon: 'git-network'
}
,
{
  title: 'Testimonial',
  url: '/testimonial',
  icon: 'clipboard'
}
  ];


  ngOnInit() {
    this.api.showplayernext(false);
    this.appBuild();
  }
  searchfocus()
  {
    this.router.navigate(['/tab/search'])
  }
 async change(val)
  {
    this.api.activeClassnext(val);
    await Storage.set({key:'activeClass', value: JSON.stringify(val)})
  }
  pay()
  {
    this.api.showplayernext(true)
    this.router.navigate(['/tab/home/play'])
  }
  rate()
  {
    this.market.open('com.urduaudiobooks.urdutafsir');

  }
  async appBuild(){
   // const info = await Device.getInfo();
      this.app = '4.0.6';
  }
}
