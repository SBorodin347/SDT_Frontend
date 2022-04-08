import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {SubjectSiteComponent} from "./subject-site/subject-site.component";
import {UserComponent} from "./user/user.component";
import {TeacherSiteComponent} from "./teacher-site/teacher-site.component";
import {StudentSiteComponent} from "./student-site/student-site.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'subjects',
    component: SubjectSiteComponent
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'teacher',
    component: TeacherSiteComponent
  },
  {
    path: 'student',
    component: StudentSiteComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
