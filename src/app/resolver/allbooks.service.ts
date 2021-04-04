import { Injectable } from '@angular/core';
import { Resolve, ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../api.service';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class AllbooksService implements Resolve<any> {
  constructor(public _api:NewapiService, public routeb : ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._api.allbook('')
  }
}