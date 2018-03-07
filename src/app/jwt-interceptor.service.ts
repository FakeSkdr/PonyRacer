import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class JwtInterceptorService implements HttpInterceptor {

  private token: string;

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.token) {
      const setHeaders = {
        Authorization: `Bearer ${this.token}`,
      };
      req = req.clone({ setHeaders });
    }

    return next.handle(req);
  }

  constructor() { }

  setJwtToken(token: string) {
    this.token = token;
  }

  removeJwtToken() {
    this.token = null;
  }
}
