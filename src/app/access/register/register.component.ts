import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAuthentication } from 'src/services/auth.service';
import { User } from '../models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Para transmitir informações para o elemento pai é necessário o OutPut e o EventEmitter
  @Output() public registerEmmiter: EventEmitter<string> = new EventEmitter();

  registerFormGroup: FormGroup = new FormGroup({
    registerUserEmail: new FormControl(null, [Validators.required, Validators.email]),
    registerUserFullName: new FormControl(null, [Validators.required]),
    registerUserName: new FormControl(null, [Validators.required]),
    registerUserPassword: new FormControl(null, [Validators.required]),
  })
  constructor(public userAuthenticationService: UserAuthentication) { }

  showLoginPanel() {
    this.registerEmmiter.emit('showLoginPanel')
  }

  validateRegisterForm(): void {
    const { registerUserEmail, registerUserFullName, registerUserName, registerUserPassword } = this.registerFormGroup.value
    let newUser: User = new User(
      registerUserName,
      registerUserFullName,
      registerUserEmail,
      registerUserPassword
    )
    this.userAuthenticationService.authNewUser(newUser);
    console.log(this.registerFormGroup)
  }

  ngOnInit(): void {
  }

}
