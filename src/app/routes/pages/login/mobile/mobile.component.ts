import { Router } from '@angular/router';
import { AuthenticationService } from './../../../../core/services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ft-signin-mobile',
  templateUrl: './mobile.component.html',
  styleUrls: ['./mobile.component.scss'],
})
export class MobileComponent implements OnInit {
  public loginForm: FormGroup;

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

  submitForm(e) {
    this.authenticationService.signIn(this.loginForm.value).subscribe(
      (response) => {
        this.router.navigate(['/']);
      },
      (err) => {
        this.toaster.error(err?.error?.Message || 'Credenciais inválidas');
      }
    );
  }
}
