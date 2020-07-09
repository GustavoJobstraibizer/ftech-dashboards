import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public authService: AuthenticationService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url.includes('portal/autenticacao/refresh')) {
      return next.handle(req);
    } else {
      return next.handle(req).pipe(
        catchError((err) => {
          if (err.status === 401) {
            this.authService.logout();
          }

          return throwError(err);
        })
      );
    }
  }
}
