import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';
import { UserAuthentication } from 'src/services/auth.service';
import { UserLogin } from '../models/User.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  @Output() public loginEmmiter: EventEmitter<string> = new EventEmitter();

  loginFormGroup: FormGroup = new FormGroup({
    userEmail: new FormControl(null, [Validators.required, /*Validators.email] NÃO CONFIÁVEL*/
    Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    userPassword: new FormControl(null, [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private userAuthService: UserAuthentication
  ) { }
  showRegisterPanel() {
    this.loginEmmiter.emit('showRegisterPanel')
  }

  validateLoginForm(): void {
    const { userEmail, userPassword } = this.loginFormGroup.controls;
    const currLoginData: UserLogin = new UserLogin(
      userEmail.value,
      userPassword.value
    )
    this.userAuthService.authLoginUser(currLoginData)
  }


  verifyCamp(camp: string): void {
    const { userEmail, userPassword } = this.loginFormGroup.controls;
    switch (camp) {
      case 'userEmail':
        userEmail.valid ? console.log('CAMP', camp, 'OK') : console.log('CAMP', camp, 'NOT OK')
        break;
      case 'userPassword':
        userPassword.valid ? console.log('CAMP', camp, 'OK') : console.log('CAMP', camp, 'NOT OK')
        break;
      default:
        false
    }
  }

  ngOnInit(): void {
  }

}
