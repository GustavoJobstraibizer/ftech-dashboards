import { Router } from '@angular/router';
import { AuthenticationService } from './../../../core/services/authentication.service';
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ft-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm: FormGroup;

  @ViewChild('checkRememberMe') checkRememberMe: ElementRef;

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    public toaster: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      Usuario: new FormControl('', [Validators.required]),
      Senha: new FormControl('', [Validators.required]),
    });
  }

  ngAfterViewInit() {
    if (localStorage.getItem('_SSoQ')) {
      const localToken = this.authenticationService.decryptUsingAES256();

      this.loginForm.get('Usuario').setValue(localToken[0]);
      this.loginForm.get('Senha').setValue(localToken[1]);

      this.checkRememberMe.nativeElement.checked = true;
    }
  }

  submitForm(e) {
    this.authenticationService.signIn(this.loginForm.value).subscribe(
      (response) => {
        if (this.checkRememberMe.nativeElement.checked) {
          const { Usuario, Senha } = this.loginForm.value;
          this.authenticationService.encryptUsingAES256(Usuario, Senha);
        }
        this.router.navigate(['/']);
      },
      (err) => {
        this.toaster.error(err?.error?.Message || 'Credenciais inválidas');
      }
    );
  }
}
