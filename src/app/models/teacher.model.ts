export class Teacher{
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phone: string;
  keyword: string;


  constructor(teacher: Teacher) {
    this.id = teacher.id;
    this.firstName = teacher.firstName;
    this.lastName = teacher.lastName;
    this.password = teacher.password;
    this.phone = teacher.phone;
    this.email = teacher.email;
    this.keyword = teacher.keyword;
  }
}

export class TeacherList {
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  keyword: string;


  constructor(teacher: TeacherList) {
    this.id = teacher.id;
    this.firstName = teacher.firstName;
    this.lastName = teacher.lastName;
    this.password = teacher.password;
    this.phone = teacher.phone;
    this.email = teacher.email;
    this.keyword = teacher.keyword;
  }


}
