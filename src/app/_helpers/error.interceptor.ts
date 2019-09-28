import * as Rollbar from 'rollbar';
import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { RollbarService } from '../app.module';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { AuthenticationService } from '@/_services';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private injector: Injector,
    private authenticationService: AuthenticationService
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.authenticationService.logout();
            location.reload(true);
          }
          // const rollbar = this.injector.get(RollbarService);
          // rollbar.error(err);
          if (err.error.error.errors) {
            const msg: any[] = [];
            err.error.error.errors.forEach(function (item: any) {
              msg.push(item.message);
            });
            return throwError({ message: msg.join(', ') });
          }
          const error = err.error.message || err.statusText;
          return throwError(error);
        }));
  }
}
