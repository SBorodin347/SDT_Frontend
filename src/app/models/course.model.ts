export enum COURSE_STATUS {APPROVED="APPROVED", REFUSED="REFUSED", CANCELLED="CANCELLED"}

export class Course {
  id?: number;
  name: string;
  hours: number;
  credit: number;
  teacherFirstName: string;
  teacherLastName: string;
  status: COURSE_STATUS;
  creationDate: string;
  lastChangeDate: Date;
  locked: boolean;
  teacherId: number;
  subscribedStudents: number[];
  select: boolean;

  constructor(subject: Course) {
    this.id = subject.id;
    this.name = subject.name;
    this.hours = subject.hours;
    this.credit = subject.credit;
    this.teacherFirstName = subject.teacherFirstName;
    this.teacherLastName = subject.teacherFirstName;
    this.status = subject.status;
    this.creationDate = subject.creationDate;
    this.lastChangeDate = subject.lastChangeDate;
    this.locked = subject.locked;
    this.teacherId = subject.teacherId;
    this.subscribedStudents = subject.subscribedStudents;
    this.select = subject.select;
  }
}

export class CoursesList {
  id?: number;
  name: string;
  hours: number;
  credit: number;
  teacherFirstName: string;
  teacherLastName: string;
  status: COURSE_STATUS;
  creationDate: string;
  lastChangeDate: Date;
  locked: boolean;
  teacherId: number;
  subscribedStudents: number[];
  select: boolean;

  constructor(subject: CoursesList) {
    this.id = subject.id;
    this.name = subject.name;
    this.hours = subject.hours;
    this.credit = subject.credit;
    this.teacherFirstName = subject.teacherFirstName;
    this.teacherLastName = subject.teacherFirstName;
    this.status = subject.status;
    this.creationDate = subject.creationDate;
    this.lastChangeDate = subject.lastChangeDate;
    this.locked = subject.locked;
    this.teacherId = subject.teacherId;
    this.subscribedStudents = subject.subscribedStudents;
    this.select = subject.select;
  }

}
