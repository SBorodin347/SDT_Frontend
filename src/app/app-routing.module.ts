import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {CoursePageComponent} from "./pages/course-page/course-page.component";
import {TeacherPageComponent} from "./pages/teacher-page/teacher-page.component";
import {StudentPageComponent} from "./pages/student-page/student-page.component";
import {LoginPageComponent} from "./pages/login-page/login-page.component";
import {AuthGuard} from "./interceptors/auth.guards";
import {OrganizationPageComponent} from "./pages/organization-page/organization-page.component";
import {CourseDetailsComponent} from "./pages/course-details-page/course-details.component";
import {SecurityPageComponent} from "./pages/security-page/security-page.component";
import {CourseNewEditPageComponent} from "./pages/course-new-edit-page/course-new-edit-page.component";
import {ReferentPageComponent} from "./pages/referent-page/referent-page.component";
import {UserNewEditPageComponent} from "./pages/user-new-edit-page/user-new-edit-page.component";
import {NgxPermissionsGuard} from "ngx-permissions";
import {ROLE} from "./models/user.model";
import {ProfilePageComponent} from "./pages/profile-page/profile-page.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuComponent,
  },
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: 'courses',
        component: CoursePageComponent,
      },
      {
        path: 'courses/:id',
        component: CourseDetailsComponent,
      }
    ]
  },
  {
    path: 'courses/edit/:id',
    canActivate: [AuthGuard],
    component: CourseNewEditPageComponent
  },
  {
    path: 'course',
    canActivate: [AuthGuard],
    component: CourseNewEditPageComponent
  },
  {
    path: 'user',
    canActivate: [NgxPermissionsGuard],
    component: UserNewEditPageComponent,
    data: {
      permissions: {
        only: [ROLE.ADMIN, ROLE.REFERENT],
        redirectTo: '/',
      }
    }
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    component: ProfilePageComponent,
  },
  {
    path: 'students',
    canActivate: [AuthGuard],
    component: StudentPageComponent
  },
  {
    path: 'teachers',
    canActivate: [AuthGuard],
    component: TeacherPageComponent
  },
  {
    path: 'referents',
    canActivate: [AuthGuard],
    component: ReferentPageComponent
  },
  {
    path: 'organization',
    canActivate: [AuthGuard],
    component: OrganizationPageComponent
  },
  {
    path: 'security',
    canActivate: [AuthGuard],
    component: SecurityPageComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
