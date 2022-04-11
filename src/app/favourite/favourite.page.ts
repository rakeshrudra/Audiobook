import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { track } from '../model/track';
import { AutoloadService } from '../service/autoload.service';
import { Storage } from '@capacitor/storage';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  constructor(public api : ApiService, public router : Router, public _autoload : AutoloadService) {
    _autoload.activetrack.subscribe(val=>{
      _autoload.activetrack.subscribe(val=>{
      this.ngOnInit();
    })
  })

  }

  playlist = [];
  defaultImage = '/assets/loader.gif';

 async ngOnInit() {
   await Storage.get({key:'favourite'}).then((val)=>{
     if(val.value)
     {
      this.playlist = JSON.parse(val.value);
     }
    })

  }
  play(data,i)
  {
    this.api.playnextchapternext(true)
    this.api.playnonext(i)
    this.api.audiolistnext(data)
    if(!this.api.showplayerinnext.value)
    {
    this.api.showplayernext(false)
    //this.router.navigate(['/tab/home/play'])
    }else
    {
      this.api.showplayernext(true)
    }

  }
  searchfocus()
  {
    this.router.navigate(['/tab/search'])
  }
 async removefavouriteAudio(track)
  {
    await Storage.get({key:'favourite'}).then(async (val) =>{
      if(val.value)
      {
        let list = JSON.parse(val.value);
      if(Array.isArray(list))
      {
      const filteredPeople = list.filter((item) => item.url != track.url);
      if(Array.isArray(filteredPeople))
        {
          await Storage.set({key:'favourite', value: JSON.stringify(filteredPeople)}).then(()=>   {  this.ckfev()})
        }
        else
        {
          await Storage.set({key:'favourite', value: JSON.stringify([])}).then(()=>   {  this.ckfev()})        }
      }
      else
      {
        await Storage.set({key:'favourite', value: JSON.stringify([])}).then(()=>   {  this.ckfev()})      }
    }
    })
  }
 async ckfev()
  {
    await Storage.get({key:'favourite'}).then((val)=>{
      if(val.value)
      {
       this.playlist = JSON.parse(val.value);
      }
     })

  }
}
