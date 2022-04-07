export class Subject{
  id?: number;
  name: string;
  hours: number;
  credit: number;


  constructor(subject: Subject) {
    this.id = subject.id;
    this.name = subject.name;
    this.hours = subject.hours;
    this.credit = subject.credit;
  }
}

export class SubjectList{
  id?: number;
  name: string;
  hours: number;
  credit: number;

  constructor(subject: SubjectList) {
    this.id = subject.id;
    this.name = subject.name;
    this.hours = subject.hours;
    this.credit = subject.credit;
  }

}
