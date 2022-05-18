import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {COURSE_STATUS, Course, CoursesList} from "../../models/course.model";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8080/api/subjects';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<CoursesList[]>{
    return this.http.get<CoursesList[]>(`${this.apiUrl}`);
  }

  getSubject(subjectId: number): Observable<Course>{
    return this.http.get<Course>(`${this.apiUrl}/${subjectId}`);
  }

  getSubjectsByStatus(status: COURSE_STATUS): Observable<CoursesList[]>{
    return this.http.get<CoursesList[]>(`${this.apiUrl}/?status=${status}`);
  }

  createSubject(subject: Course): Observable<Course>{
    return this.http.post<Course>(`${this.apiUrl}`, subject);
  }

  updateSubject(subjectId: number, subject: Course): Observable<Course>{
    return this.http.put<Course>(`${this.apiUrl}/${subjectId}`, subject);
  }

  deleteSubject(subjectId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${subjectId}`);
  }

}
