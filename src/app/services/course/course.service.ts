import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {COURSE_STATUS, Course, CoursesList} from "../../models/course.model";
import {SubscriptionModel, SubscriptionModelList} from "../../models/subscriptionModel";

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

  getSubscription(subjectId: number, studentId: number): Observable<SubscriptionModelList>{
    return this.http.get<SubscriptionModelList>(`${this.apiUrl}/subscribe/${subjectId}/${studentId}`);
  }

  createSubject(subject: Course): Observable<number>{
    return this.http.post<number>(`${this.apiUrl}`, subject);
  }

  updateSubject(subjectId: number, subject: Course): Observable<Course>{
    return this.http.put<Course>(`${this.apiUrl}/${subjectId}`, subject);
  }

  subscribeForCourse(model: SubscriptionModel): Observable<SubscriptionModelList>{
    return this.http.post<SubscriptionModelList>(`${this.apiUrl}/subscribe`, model);
  }

  unsubscribeFromCourse(model: SubscriptionModel): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/unsubscribe`, {body: model});
  }

  lockSubjectById(subjectId: number): Observable<void>{
    return this.http.put<void>(`${this.apiUrl}/lock/${subjectId}`, undefined);
  }

  deleteSubject(subjectId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${subjectId}`);
  }

}
