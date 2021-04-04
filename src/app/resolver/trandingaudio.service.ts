import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRouteSnapshot } from '@angular/router';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class TrandingaudioService {

  constructor(public _api:NewapiService) { }
  resolve(route: ActivatedRouteSnapshot) {
    return this._api.trandingaudio()
  }
}
