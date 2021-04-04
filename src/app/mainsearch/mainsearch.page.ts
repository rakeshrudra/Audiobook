import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network/ngx';
import { track } from '../model/track';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mainsearch',
  templateUrl: './mainsearch.page.html',
  styleUrls: ['./mainsearch.page.scss'],
})
export class MainsearchPage implements OnInit {

  constructor(public storage : Storage, public network : Network, public api : ApiService, public router : Router) { 
    this.network.onConnect().subscribe(() => {
      this.ngOnInit()
    });
  }
  chapters = null;
  audios = null;
  searchTerm;
  storesubcategorys = null
  ngOnInit() {
    this.storage.get('chapters').then(val=>{
       this.chapters = val
       this.storesubcategorys = val
    })
    this.storage.get('allaudios').then((val : track[])=>{
      this.audios = val;//this.router.navigate(['/tab'], { replaceUrl: true })
      console.log(val)
    })
  }
  setFilteredItems()
  {
    const k = this.searchTerm.toLowerCase();
    this.storesubcategorys.filter(( x , k ) => {
      var cc = x.subcategory ? x.subcategory : '';
        console.log(cc.toLowerCase().indexOf(k))
     if(cc.toLowerCase().indexOf(k) != -1)
       {
         console.log(x)
       }
    });
  }
  play(data)
  {
    this.api.playnonext(data)
    this.api.audiolistnext([data])
    this.router.navigate(['/tab/home/play'])
  }
}
