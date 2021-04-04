import { Component, OnInit } from '@angular/core';
import { NewapiService } from '../newapi.service';

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.page.html',
  styleUrls: ['./testimonial.page.scss'],
})
export class TestimonialPage implements OnInit {

  constructor(public _api : NewapiService) { }
  data = []
  ngOnInit() {
    this._api.testimonial().subscribe(val=>{
      this.data = val;
    })
  }

}
