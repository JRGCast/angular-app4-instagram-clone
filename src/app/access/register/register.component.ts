import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from 'firebase/auth';
import { UserAuthentication } from 'src/services/auth.service';
import { UserRegister } from '../models/User.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  // Para transmitir informações para o elemento pai é necessário o OutPut e o EventEmitter
  showRegisterOk: boolean = false
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
    let newUser: UserRegister = new UserRegister(
      registerUserName,
      registerUserFullName,
      registerUserEmail,
      registerUserPassword
    )
    this.userAuthenticationService.authRegisterNewUser(newUser).then((response: any) => {
      console.log(typeof response, response, response.user)
      if(response.user) {
        this.showRegisterOk = true
        this.showLoginPanel()
      } else {
        this.showRegisterOk = false
      }
      alert(`DEU BOM?! ${this.showRegisterOk}`)
    });
  }

  ngOnInit(): void {
  }

}
