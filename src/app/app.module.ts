import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { MenuComponent } from './menu/menu.component';
import { CoursePageComponent } from './pages/course-page/course-page.component';
import { CourseFormComponent } from './forms/course-form/course-form.component';
import { SubjectListComponent } from './tables/course-list/subject-list.component';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page.component';
import { StudentPageComponent } from './pages/student-page/student-page.component';
import { HeaderComponent } from './across-components/header/header.component';
import { SidebarComponent } from './across-components/sidebar/sidebar.component';
import { LoginFormComponent } from "./forms/login-form/login-form.component";
import { LoginPageComponent } from './pages/login-page/login-page.component';
import {AuthHeaderInterceptor} from "./interceptors/auth-header.interceptor";
import { OrganizationPageComponent } from './pages/organization-page/organization-page.component';
import {TableModule} from "@sebgroup/ng-components";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CourseFilterByNamePipe} from "./shared/subject-filter.pipe";
import { CourseDetailsComponent } from './pages/course-details-page/course-details.component';
import {NgxPermissionsModule, NgxPermissionsRestrictStubModule} from 'ngx-permissions';
import { SecurityPageComponent } from './pages/security-page/security-page.component';
import {ErrorInterceptor} from "./interceptors/error.interceptor";
import { SortModalComponent } from './modal-windows/sort-modal/sort-modal.component';
import { CourseNewEditPageComponent } from './pages/course-new-edit-page/course-new-edit-page.component';
import { UserListComponent } from './user-list/user-list.component';
import { ReferentPageComponent } from './pages/referent-page/referent-page.component';
import { UserNewEditPageComponent } from './pages/user-new-edit-page/user-new-edit-page.component';
import { UserFormComponent } from './forms/user-form/user-form.component';
import { ProfilePageComponent} from "./pages/profile-page/profile-page.component";
import { SubscriptionsListComponent } from './tables/subscriptions-list/subscriptions-list.component';
import { SubscribedCourseInfoComponent } from './sections/subscribed-course-info/subscribed-course-info.component';


@NgModule({
    declarations: [
        AppComponent,
        MenuComponent,
        CoursePageComponent,
        CourseFormComponent,
        SubjectListComponent,
        TeacherPageComponent,
        StudentPageComponent,
        HeaderComponent,
        SidebarComponent,
        LoginFormComponent,
        LoginPageComponent,
        OrganizationPageComponent,
        CourseFilterByNamePipe,
        ProfilePageComponent,
        CourseDetailsComponent,
        SecurityPageComponent,
        SortModalComponent,
        SortModalComponent,
        CourseNewEditPageComponent,
        UserListComponent,
        ReferentPageComponent,
        UserNewEditPageComponent,
        UserFormComponent,
        SubscriptionsListComponent,
        SubscribedCourseInfoComponent,
    ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    NgbModule,
    NgxPermissionsModule.forRoot(),
    NgxPermissionsRestrictStubModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHeaderInterceptor,
    multi: true,
  },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
  ],

  bootstrap: [AppComponent],
})
export class AppModule { }
