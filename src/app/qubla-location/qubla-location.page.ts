import { NewapiService } from './../newapi.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-qubla-location',
  templateUrl: './qubla-location.page.html',
  styleUrls: ['./qubla-location.page.scss'],
})
export class QublaLocationPage implements OnInit {

  constructor(public _apiNew: NewapiService) { }

  ngOnInit() {
  }

}
