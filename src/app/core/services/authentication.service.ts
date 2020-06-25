import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Local } from 'protractor/built/driverProviders';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(public http: HttpClient, private route: Router) {}

  signIn({ Usuario, Senha }) {
    return this.http
      .post<any>(
        `${environment.API.URL}${environment.API.Routes.auth.signin.post}`,
        { Usuario, Senha },
        { observe: 'response' }
      )
      .pipe(
        map((user) => {
          localStorage.setItem('currentUser', JSON.stringify(user?.body?.Data));
          return user;
        })
      );
  }

  refresh(
    AccessToken: string,
    RefreshToken: string
  ): Observable<HttpResponse<any>> {
    return this.http.post<any>(
      `${environment.API.URL}${environment.API.Routes.auth.refresh.post}`,
      { AccessToken, RefreshToken },
      { observe: 'response' }
    );
  }

  logout() {
    localStorage.clear();
    this.route.navigate(['/login']);
  }
}
