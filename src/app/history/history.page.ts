import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { AutoloadService } from '../service/autoload.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
})
export class HistoryPage implements OnInit {

  constructor(public storage : Storage, public api : ApiService , public router : Router, public _autoload : AutoloadService) { 
    _autoload.activetrack.subscribe(val=>{
      _autoload.activetrack.subscribe(val=>{
      this.ngOnInit();
    })
  })

  }
  playlist = []
  defaultImage = '/assets/loader.gif';

  ngOnInit() 
  {
    this.storage.get('history').then(val=>{
      this.playlist = val.reverse();
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

   clearall()
   {
     this.storage.remove('history').then(()=>{
      this.playlist = []
     })
     this.ngOnInit()

   }
}
