import { registerLocaleData } from '@angular/common'
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http'
import localePt from '@angular/common/locales/pt'
import { LOCALE_ID, NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { ToastrModule } from 'ngx-toastr'
import { AppComponent } from './app.component'
import { CoreModule } from './core/core.module'
import { ErrorInterceptor } from './core/interceptors/error.interceptor'
import { JwtInterceptor } from './core/interceptors/jwt.interceptor'
import { LayoutModule } from './layout/layout.module'
import { RoutesModule } from './routes/routes.module'
import { SharedModule } from './shared/shared.module'

registerLocaleData(localePt)

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    CoreModule,
    LayoutModule,
    SharedModule.forRoot(),
    // BrowserModule,
    RoutesModule,
    // AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      timeOut: 3000,
      autoDismiss: true,
      closeButton: true,
      progressBar: true,
    }),
  ],
  providers: [
    TranslateService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LOCALE_ID, useValue: 'pt-BR' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
