import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import * as moment from 'moment';
import { Storage } from '@ionic/storage';
import { book } from '../model/book';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.page.html',
  styleUrls: ['./loader.page.scss'],
})
export class LoaderPage implements OnInit {
 
  classng = 'example-1'
  per = 0.00;
  percent = 0;
  myVar;
  constructor(public router: Router, public api: ApiService, public storage: Storage) {
  }
  jsonaudio = '/assets/audios.json'; 
  ngOnInit() {
    this.myVar = setInterval(()=>{
      if(this.percent < 99)
      {
      this.per = this.per+.016;
      this.percent = Math.round(this.per*100)
      }else
      {
        this.jsoninportaudio()
      }
      
    }, 1000);

        this.api.allaudio({}).subscribe(data=>{
          this.storage.set('allaudios',data).then((e)=>{
            this.per = 0.93
           //this.processaudiodate(data)
           this.timmer1()
          }).then(()=>{
            this.api.isapiloadingnext(true);
          })
        })
  }
  timmer() {
    setTimeout(() => { this.classng = 'example-2'; this.timmer1() }, 3000);
  }
  timmer1() {
    setTimeout(() => {
      var date =new Date().toLocaleString();
      this.storage.set('lastdate', date)
      clearInterval(this.myVar);
      this.router.navigate(['tab/home/landing'], { replaceUrl: true });
    }, 3000);
  }
  /////////////////////////////////////
  async processaudiodate(alltracks)
  {
   this.per = 0.85
   this.percent = 85
   /* this.storage.set('allaudios',alltracks).then(()=>{
      this.timmer1()
    });
*/
    this.storage.get('allbooks').then((val : book[])=>{


      for(var i =0; i <alltracks.length;i++)
      {
            let vv = val.find(e=>e.id == alltracks[i].book_id,val)
             alltracks[i].booksynopsysenglish = vv.synopsys;
             alltracks[i].booksynopsysurdu = vv.synopsysurdu;
      }

            this.storage.set('allaudios',alltracks).then(()=>{
             console.log(alltracks)
              this.timmer1()
            });
    })
  }

  jsoninportaudio()
  {
    //clearInterval(this.myVar);
    this.api.localaudio().subscribe(val=>{
      this.storage.set('allaudios',val).then(()=>{
      });
     })
    this.timmer1();
  }

}

