import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {SubjectSiteComponent} from "./subject-site/subject-site.component";
import {UserComponent} from "./user/user.component";
import {TeacherFormComponent} from "./teacher-form/teacher-form.component";
import {StudentFormComponent} from "./student-form/student-form.component";

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
    path: 'add-teacher',
    component: TeacherFormComponent
  },
  {
    path: 'add-student',
    component: StudentFormComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
