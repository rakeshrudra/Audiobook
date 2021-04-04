import { Injectable } from '@angular/core';
import { NewapiService } from '../newapi.service';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  constructor(public _api:NewapiService, public routeb : ActivatedRoute) { }
  resolve(route: ActivatedRouteSnapshot) { 
    let mod = route.paramMap.get('id');
    return this._api.topicbychapter("?chapter_id="+mod)
  }
}