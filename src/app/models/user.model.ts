export class User{
  username: string;
  password: string;
  constructor(user: User) {
    this.username = user.username;
    this.password = user.password;
  }
}
