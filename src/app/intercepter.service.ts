import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

import { Observable , from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IntercepterService implements HttpInterceptor {

  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
        const url = request.url//+'?lastdate='+token;
          const reqClone = request.clone({
            url: url
          });
          return next.handle(reqClone);
    }
  }
