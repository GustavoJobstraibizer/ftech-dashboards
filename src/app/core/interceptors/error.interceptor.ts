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
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err) => {
        // const serverError = this.transformObjectKeysToLower(err.error);

        // if (this.httpStatusCodeErrorObj[err.status]) {
        //   this.httpStatusCodeErrorObj[err.status](serverError);
        // } else {
        //   this.showMessageErrorDefault(serverError);
        // }

        return throwError(err);
      })
    );
  }
}
