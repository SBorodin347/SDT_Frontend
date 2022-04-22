export class Subject{
  id?: number;
  name: string;
  hours: number;
  credit: number;
  teacherFirstName: string;
  teacherLastName: string;
  teacherId: number;


  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.hours = subject.hours;
    this.credit = subject.credit;
    this.teacherFirstName = subject.teacherFirstName;
    this.teacherLastName = subject.teacherFirstName;
    this.teacherId = subject.teacherId;
  }
}

export class SubjectList{
  id?: number;
  name: string;
  hours: number;
  credit: number;
  teacherFirstName: string;
  teacherLastName: string;
  teacherId: number;

  constructor(subject: SubjectList) {
    this.id = subject.id;
    this.name = subject.name;
    this.hours = subject.hours;
    this.credit = subject.credit;
    this.teacherFirstName = subject.teacherFirstName;
    this.teacherLastName = subject.teacherFirstName;
    this.teacherId = subject.teacherId;
  }

}
