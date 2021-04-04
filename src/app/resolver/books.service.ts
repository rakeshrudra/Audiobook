import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { NewapiService } from '../newapi.service';

@Injectable({
  providedIn: 'root' 
})
export class BooksService implements Resolve<any> 
  {
    constructor(public _api:NewapiService, public routeb : ActivatedRoute) { }
    resolve(route: ActivatedRouteSnapshot) {
      let mod = route.paramMap.get('book');
      return this._api.book('?book_id='+mod)
    }
  }