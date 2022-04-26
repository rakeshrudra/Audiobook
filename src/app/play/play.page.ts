import { Component, OnInit } from '@angular/core';
import { MusicControls } from '@awesome-cordova-plugins/music-controls/ngx';
import { NavController, ToastController, LoadingController } from '@ionic/angular';
import { AudioProvider } from '../service/audio-service';
import { ApiService } from '../api.service';
import { track } from '../model/track';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-play',
  templateUrl: './play.page.html',
  styleUrls: ['./play.page.scss'],
})
export class PlayPage implements OnInit {

  playlist = []
  favourit = []
  activetrack : track;
  defaultImage = '/assets/loader.gif';

  constructor(public loadingController : LoadingController, public socialSharing : SocialSharing,  public toastController : ToastController, public router: Router, public navCtrl: NavController, public api: ApiService , public storage : Storage)
  {

    api.audiolist.subscribe((val:track[])=>{
      this.playlist = val;
    })
    this.api.currentaudio.subscribe((val:track)=>{
      this.activetrack = val;
    });
    this.ckfev()
  }

  ckfev()
  {
    this.storage.get('favourite').then(val =>{
      if(Array.isArray(val))
      {
        this.favourit = val
      }
      for(var i=0; i<this.playlist.length; i++)
      {
        if (val.filter(e => e.url === this.playlist[i].url).length > 0) {
          this.playlist[i].fav = true;
         }else
         {
          this.playlist[i].fav = false;
         }
      }

    })
  }

  ngOnInit() {
  }
  play(data,i)
  {
    this.api.playnonext(i)
  }
  favourite(track)
  {
    this.storage.get('favourite').then((val : track[]) =>{
      if(Array.isArray(val))
      {
      const filteredPeople = val.filter((item) => item.url != track.url);
      if(Array.isArray(filteredPeople))
        {
          this.favourit = filteredPeople;
          this.favourit.push(track)
          this.storage.set('favourite',this.favourit).then(()=>   { this.presentToast(); this.ckfev()})
        }
        else
        {
          this.storage.set('favourite',[track]).then(()=> { this.presentToast(); this.ckfev()})
        }
      }
      else
      {
         this.storage.set('favourite',[track]).then(()=>   { this.presentToast(); this.ckfev()})
      }
    })
  }

  removefavouriteAudio(track : track)
  {
    this.storage.get('favourite').then((val : track[]) =>{
      if(Array.isArray(val))
      {
      const filteredPeople = val.filter((item) => item.url != track.url);
      if(Array.isArray(filteredPeople))
        {
          this.favourit = filteredPeople;
          this.storage.set('favourite',this.favourit).then(()=>   {  this.ckfev()})
        }
        else
        {
          this.storage.set('favourite',[]).then(()=> {  this.ckfev()})
        }
      }
      else
      {
         this.storage.set('favourite',[]).then(()=>   {  this.ckfev()})
      }
    })
  }

  searchfocus()
  {
    this.router.navigate(['/tab/search'])
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Audio marked as favourite.',
      duration: 1500
    });
    toast.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      duration: 4000,
      message: 'Loading.',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  shareaudio(msg,img,url)
  {
    this.presentLoadingWithOptions();
   this.socialSharing.share(msg,'Islamin Audio Book',img,url).then(()=>{

   })
  }



}
