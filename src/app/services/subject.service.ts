import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subject, SubjectList} from "../models/subject.model";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private apiUrl = 'http://localhost:8080/api/subjects';

  constructor(private http: HttpClient) { }

  getSubjects(): Observable<SubjectList[]>{
    return this.http.get<SubjectList[]>(`${this.apiUrl}`);
  }

  getSubject(subjectId: number): Observable<Subject>{
    return this.http.get<Subject>(`${this.apiUrl}/${subjectId}`);
  }

  createSubject(subject: Subject): Observable<Subject>{
    return this.http.post<Subject>(`${this.apiUrl}`, subject);
  }

  updateSubject(subjectId: number, subject: Subject): Observable<Subject>{
    return this.http.put<Subject>(`${this.apiUrl}/${subjectId}`, subject);
  }

  deleteSubject(subjectId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${subjectId}`);
  }

}
