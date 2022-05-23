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
  dateOfRegistration: Date;
  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.password = user.password;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.roles = user.roles;
    this.dateOfRegistration = user.dateOfRegistration;
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
  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.roles = user.roles;
  }

}

export class StudentUser{
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
  phone: string;
  email: string;
  dateOfRegistration: Date;
  constructor(user: StudentUser) {
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.phone = user.phone;
    this.email = user.email;
    this.dateOfRegistration = user.dateOfRegistration;
  }
}
