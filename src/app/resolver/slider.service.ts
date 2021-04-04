import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class SliderService implements Resolve<any> {
  constructor(public _api:NewapiService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._api.slider()
  }
}
