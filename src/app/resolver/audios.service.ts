import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root'
})
export class AudiosService implements Resolve<any> {
  constructor(public _api:NewapiService, public routeb : ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot) { 
    let mod = route.paramMap.get('id');
    return this._api.audio("?chapter_id="+mod)
  }
}