import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { track } from '../model/track';
import { AutoloadService } from '../service/autoload.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {

  constructor(public storage : Storage, public api : ApiService, public router : Router, public _autoload : AutoloadService) { 
    _autoload.activetrack.subscribe(val=>{
      _autoload.activetrack.subscribe(val=>{
      this.ngOnInit();
    })
  })

  }

  playlist = [];
  defaultImage = '/assets/loader.gif';

  ngOnInit() {
    this.storage.get('favourite').then((val : track[])=>{
      this.playlist = val
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
  removefavouriteAudio(track)
  {
    this.storage.get('favourite').then((val : track[]) =>{
      if(Array.isArray(val))
      {
      const filteredPeople = val.filter((item) => item.url != track.url); 
      if(Array.isArray(filteredPeople))
        {
          this.storage.set('favourite',filteredPeople).then(()=>   {  this.ckfev()})
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
  ckfev()
  {
    this.storage.get('favourite').then(val=>{
      this.playlist = val
    })
  }
}