import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {SubjectSiteComponent} from "./subject-site/subject-site.component";
import {UserComponent} from "./user/user.component";
import {TeacherSiteComponent} from "./teacher-site/teacher-site.component";
import {StudentSiteComponent} from "./student-site/student-site.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "./interceptors/auth.guards";

const routes: Routes = [
  {
    path: 'login',
    component: LoginPageComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuComponent
  },
  {
    path: 'subjects',
    canActivate: [AuthGuard],
    component: SubjectSiteComponent
  },
  {
    path: 'users',
    canActivate: [AuthGuard],
    component: UserComponent
  },
  {
    path: 'teacher',
    canActivate: [AuthGuard],
    component: TeacherSiteComponent
  },
  {
    path: 'student',
    canActivate: [AuthGuard],
    component: StudentSiteComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
