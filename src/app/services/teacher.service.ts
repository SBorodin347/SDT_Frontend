import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Teacher, TeacherList} from "../models/teacher.model";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:8080/api/teachers';

  constructor(private http: HttpClient) { }

  getTeachers(): Observable<TeacherList[]>{
    return this.http.get<TeacherList[]>(`${this.apiUrl}`);
  }

  getTeacher(teacherId: number): Observable<Teacher>{
    return this.http.get<Teacher>(`${this.apiUrl}/${teacherId}`);
  }

  createTeacher(teacher: Teacher): Observable<Teacher>{
    return this.http.post<Teacher>(`${this.apiUrl}`, teacher);
  }

  updateTeacher(teacherId: number, teacher: Teacher): Observable<Teacher>{
    return this.http.put<Teacher>(`${this.apiUrl}/${teacherId}`, teacher);
  }

  deleteTeacher(teacherId: number): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${teacherId}`);
  }

}
