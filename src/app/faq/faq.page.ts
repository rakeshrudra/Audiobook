import { Component, OnInit } from '@angular/core';
import { NewapiService } from '../newapi.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.page.html',
  styleUrls: ['./faq.page.scss'],
})
export class FaqPage implements OnInit {

  constructor(public _api : NewapiService) { }

  faqs : Array<{question:string,ans:string}>;
  ngOnInit() {
    this._api.faqs().subscribe((val)=>{
      this.faqs = val
    })
  }

}
