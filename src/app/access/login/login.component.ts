import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],

})
export class LoginComponent implements OnInit {

  @Output() public loginEmmiter: EventEmitter<string> = new EventEmitter();

  loginFormGroup: FormGroup = new FormGroup({
    userEmail: new FormControl(null, [Validators.required, Validators.email]),
    userPassword: new FormControl(null, [Validators.required])
  });
  constructor() { }
  showRegisterPanel() {
    this.loginEmmiter.emit('showRegisterPanel')
  }

  validateLoginForm(): void {
    console.log(this.loginFormGroup)
  }

  ngOnInit(): void {
  }

}
