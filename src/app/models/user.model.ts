export enum ROLE {ADMIN="ROLE_ADMIN", REFERENT="ROLE_REFERENT", STUDENT="ROLE_STUDENT", TEACHER="ROLE_TEACHER"}

export class User{
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  phone: string;
  email: string;
  roles: string[];
  role: string;
  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.roles = user.roles;
    this.role = user.role;
  }
}

export class PasswordUpdate{
  currentPassword: string;
  newPassword: string;
  constructor(password: PasswordUpdate) {
    this.currentPassword = password.currentPassword;
    this.newPassword = password.newPassword;
  }
}

export class UserList{
  id?: number;
  firstName: string;
  lastName: string;
  roles: string[];
  role: string;
  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roles = user.roles;
    this.role = user.role;
  }
}
