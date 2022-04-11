import {Component, Input} from '@angular/core';
import {Subject, SubjectList} from "../models/subject.model";
import {SubjectService} from "../../subject.service";
import {Router} from "@angular/router";


enum NAV {SUBJECTS, USERS,HOME}
@Component({
  selector: 'app-subject-site',
  templateUrl: './subject-site.component.html',
  styleUrls: ['./subject-site.component.css']
})

export class SubjectSiteComponent{

  subjects: SubjectList[] = [];
  activeSubject?: Subject;

  @Input()
  isActive = false;

  constructor(private router: Router, private subjectService: SubjectService) { }

  navig = NAV;

  openNav(n : NAV){
    if(n === NAV.SUBJECTS)
      this.router.navigate(['/subjects']);
    if(n === NAV.USERS)
      this.router.navigate(['/users']);
    if(n === NAV.HOME)
      this.router.navigate(['/']);
  }

  ngOnInit(): void{
    this.refreshSubjects();
  }

  refreshSubjects(): void{
    this.subjectService.getSubjects().subscribe(data => {
      console.log('Prislo:',data);
      this.subjects = data;
    });
  }

  add(subject: Subject): void{
    this.subjectService.createSubject(subject).subscribe(data => {
      this.refreshSubjects();
    });
  }

  edit(subject: Subject): void{
    if(subject.id !== undefined){
      this.subjectService.updateSubject(subject.id, subject).subscribe(data => {
        this.refreshSubjects();
      });
    }
  }

  editSubjectFromList(subjectId: number): void{
    this.subjectService.getSubject(subjectId).subscribe(data => {
      this.activeSubject = data;
    });
  }

  deleteSubjectFromList(subjectId: number): void{
    if(confirm('Are you sure?')){
      this.subjectService.deleteSubject(subjectId).subscribe(data => {
        this.refreshSubjects();
      });
    }
  }

}
