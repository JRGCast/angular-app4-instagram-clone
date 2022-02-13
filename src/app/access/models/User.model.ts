export class UserRegister {

  constructor(
    public userName: string,
    public userFullName: string,
    public userEmail: string,
    public userPassword: string,
  ) { }
}

export class UserLogin {
  constructor(
    public userEmail: string,
    public userPassword: string,
  ) { }
}