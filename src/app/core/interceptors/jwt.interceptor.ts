import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HelperService } from "../services/helper.service";

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private _helperService: HelperService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (currentUser && currentUser.accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this._helperService.getAccessToken()}`,
        },
      });
    }

    return next.handle(request);
  }
}
