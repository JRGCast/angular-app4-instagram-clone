import { UserRegister, UserLogin } from "src/app/access/models/User.model";
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,
  Auth, UserCredential, signOut
} from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";


@Injectable()
export class UserAuthentication {
  public authMethod: Auth = getAuth();
  private token_id!: string
  constructor(
    private routerService: Router
  ) { }

  public async authRegisterNewUser(theNewUser: UserRegister): Promise<UserCredential | unknown> {
    const { userEmail, userPassword, userName, userFullName } = theNewUser;
    const db = getDatabase();
    try {
      const userCredential = await createUserWithEmailAndPassword(this.authMethod, userEmail, userPassword);
      const userCred = userCredential.user;
      set(ref(db, `users/${ btoa(userEmail) }`), { userName, userFullName, userEmail });
      return userCredential
    } catch (error) {
      return error;
    }
  }

  public async authLoginUser(theUser: UserLogin): Promise<void | string> {
    try {
      const response = await signInWithEmailAndPassword(this.authMethod, theUser.userEmail, theUser.userPassword);
      const authToken = await this.authMethod.currentUser?.getIdToken()
      this.token_id = authToken ? authToken : '';
      if (this.token_id !== '') {
        localStorage.setItem('token_id', this.token_id)
        this.routerService.navigate(['/home'])
      }
      return console.log(this.token_id)
    } catch (error) {
      return console.log(error);
    }
  }

  public isAuthenticated(): boolean {
    const getStorageToken = localStorage.getItem('token_id');
    if (!this.token_id && getStorageToken !== null) {
      this.token_id = getStorageToken;
      return true
    }
    if (getStorageToken === null && !this.token_id) {
      this.routerService.navigate(['/'])
    }
    
    return Boolean(this.token_id);
  }

  public async cleanAndLogOut(): Promise<void> {
    try {
      await signOut(this.authMethod);
      this.token_id = '';
      localStorage.removeItem('token_id');
      this.routerService.navigate(['/']);
    } catch (error) {
      console.debug(error);
    }
  }
}