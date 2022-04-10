import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Student, StudentList} from "./app/models/student.model";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private apiUrl = 'http://localhost:8080/api/students';

  constructor(private http: HttpClient) { }

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
