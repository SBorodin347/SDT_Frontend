export class Student{
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  keyword: string;


  constructor(student: Student) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.password = student.password;
    this.phone = student.phone;
    this.email = student.email;
    this.keyword = student.keyword;
  }
}

export class StudentList{
  id?: number;
  firstName: string;
  lastName: string;
  password: string;
  phone: string;
  email: string;
  keyword: string;


  constructor(student: StudentList) {
    this.id = student.id;
    this.firstName = student.firstName;
    this.lastName = student.lastName;
    this.password = student.password;
    this.email = student.email;
    this.phone = student.phone;
    this.keyword = student.keyword;
  }


}
