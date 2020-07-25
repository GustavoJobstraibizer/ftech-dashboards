import { animate, style, transition, trigger } from '@angular/animations'
import { Component, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthenticationService } from './../../../../core/services/authentication.service'

@Component({
  selector: 'ft-signin-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
  animations: [
    trigger('slideUp', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate(300, style({ opacity: 1, transform: 'translateY(0px)' })),
      ]),
    ]),
    trigger('growUp', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '250ms 300ms ease-in',
          style({ opacity: 1, transform: 'scale(1.0)' })
        ),
      ]),
    ]),
  ],
})
export class MobileComponent implements OnInit {
  public loginForm: FormGroup

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    public toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Usuario: new FormControl('', [Validators.required]),
      Senha: new FormControl('', [Validators.required]),
    })
  }

  submitForm(e) {
    this.authenticationService.signIn(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/'])
      },
      (err) => {
        this.toaster.error(err?.error?.Message || 'Credenciais inválidas')
      }
    )
  }
}
