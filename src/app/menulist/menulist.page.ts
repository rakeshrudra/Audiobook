import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { ApiService } from '../api.service';
import { Storage } from '@ionic/storage';
import { Market } from '@ionic-native/market/ngx';
//import { AppVersion } from '@ionic-native/app-version/ngx';
import { Plugins } from '@capacitor/core';
const { App,  Device } = Plugins;

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.page.html',
  styleUrls: ['./menulist.page.scss'],
})
export class MenulistPage implements OnInit {

  constructor(public  router : Router , private market: Market, public platform : Platform, public storage : Storage, public api : ApiService) {
  /*  this.appVersion.getVersionNumber().then(e => {
        this.app = e;
    })*/
  }
  app;
  public appPages = [
    {
      title: 'Salah Timing',
      url: '/prayer-time',
      icon: 'information-circle'
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
  change(val)
  {
    this.api.activeClassnext(val);
    this.storage.set('activeClass',val)
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
    const info = await Device.getInfo();
      this.app = info.appVersion;
  }
}
