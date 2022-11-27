import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
// @ts-ignore
import {Student, StudentList} from "./models/student.model";
import {AuthService} from "./authentication/auth.service";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private token;

  private apiUrl = 'http://backend:8080/api/students';

  constructor(private http: HttpClient, private auth: AuthService) {
    this.token = this.auth.getToken();
  }

  getStudents(): Observable<StudentList[]>{
    return this.http.get<StudentList[]>(`${this.apiUrl}`);
  }

  getStudent(studentId: number): Observable<Student>{
    return this.http.get<Student>(`${this.apiUrl}/${studentId}`);
  }

  createStudent(student: Student): Observable<Student>{
    return this.http.post<Student>(`${this.apiUrl}`, student);
  }

  updateStudent(studentId: number, student: Student): Observable<Student>{
    return this.http.put<Student>(`${this.apiUrl}/${studentId}`, student);
  }

  deleteStudent(studentId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${studentId}`);
  }

}
