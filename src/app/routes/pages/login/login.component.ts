import { animate, style, transition, trigger } from '@angular/animations'
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr'
import { AuthenticationService } from './../../../core/services/authentication.service'

@Component({
  selector: 'ft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(300, style({ opacity: 1, transform: 'scale(1.0)' })),
      ]),
    ]),
    trigger('growUp', [
      transition('void => *', [
        style({ opacity: 0, transform: 'scale(0.8)' }),
        animate(
          '300ms 700ms ease-in',
          style({ opacity: 1, transform: 'scale(1.0)' })
        ),
      ]),
    ]),
    trigger('slideUp', [
      transition('void => *', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate(
          '250ms 300ms ease-in',
          style({ opacity: 1, transform: 'translateY(0)' })
        ),
      ]),
    ]),
  ],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm: FormGroup

  @ViewChild('checkRememberMe') checkRememberMe: ElementRef

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

  ngAfterViewInit() {
    if (localStorage.getItem('_SSoQ')) {
      const localToken = this.authenticationService.decryptUsingAES256()

      this.loginForm.get('Usuario').setValue(localToken[0])
      this.loginForm.get('Senha').setValue(localToken[1])

      this.checkRememberMe.nativeElement.checked = true
    }
  }

  submitForm(e) {
    this.authenticationService.signIn(this.loginForm.value).subscribe(
      (response) => {
        if (this.checkRememberMe.nativeElement.checked) {
          const { Usuario, Senha } = this.loginForm.value
          this.authenticationService.encryptUsingAES256(Usuario, Senha)
        }
        this.router.navigate(['/'])
      },
      (err) => {
        this.toaster.error(err?.error?.Message || 'Credenciais inválidas')
      }
    )
  }
}
