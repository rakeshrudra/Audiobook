import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../api.service';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService implements Resolve<any> {
  constructor(public _api:NewapiService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._api.modules()
  }
}

