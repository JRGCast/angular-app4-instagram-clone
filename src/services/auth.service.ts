import { User } from "src/app/access/models/User.model";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { getDatabase, ref, set } from "firebase/database";


export class UserAuthentication {
  constructor() { }

  public authNewUser(theNewUser: User): void {
    const authMethod = getAuth();
    const { userEmail, userPassword, userName, userFullName } = theNewUser;
    const db = getDatabase();
    createUserWithEmailAndPassword(authMethod, userEmail, userPassword)
      .then((userCredential) => {
        const userCred = userCredential.user;
    set(ref(db, `users/${btoa(userEmail)}`), {userName, userFullName, userEmail});
        console.log('credential', userCred);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error: ', errorCode, errorMessage)
      })
  }  
}