import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import { SubjectSiteComponent } from './subject-site/subject-site.component';
import { SubjectFormComponent } from './subject-form/subject-form.component';
import { SubjectListComponent } from './subject-list/subject-list.component';
import { UserComponent } from './user/user.component';
import { TeacherFormComponent } from './teacher-form/teacher-form.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { TeacherSiteComponent } from './teacher-site/teacher-site.component';
import { TeacherListComponent } from './teacher-list/teacher-list.component';
import { StudentListComponent } from './student-list/student-list.component';
import { StudentSiteComponent } from './student-site/student-site.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SubjectSiteComponent,
    SubjectFormComponent,
    SubjectListComponent,
    UserComponent,
    TeacherFormComponent,
    TeacherSiteComponent,
    TeacherListComponent,
    StudentFormComponent,
    StudentListComponent,
    StudentSiteComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
