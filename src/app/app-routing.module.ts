import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MenuComponent} from "./menu/menu.component";
import {SubjectSiteComponent} from "./subject-site/subject-site.component";

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'subjects',
    component: SubjectSiteComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
