import { RouterModule, Routes } from "@angular/router";
import {
  CourseCardComponent,
  CourseFormComponent,
  LoginFormComponent,
  RegistrationFormComponent
} from "./shared/components";
import { CoursesListComponent } from "./features/courses/courses-list/courses-list.component";
import { NgModule } from "@angular/core";
import { AuthorizedGuard } from "./auth/guards/authorized.guard";
import { NotAuthorizedGuard } from "./auth/guards/not-authorized.guard";

export const routes: Routes = [
  { path: "login", component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
  { path: "register", component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
  {
    path: "courses",
    children: [
      { path: "", component: CoursesListComponent },
      { path: "add", component: CourseFormComponent },
      { path: ":id", component: CourseCardComponent },
      { path: "edit/:id", component: CourseFormComponent }
    ],
    canActivate: [AuthorizedGuard]
  },
  // { path: "login", component: LoginFormComponent },
  // { path: "login", component: LoginFormComponent },
  { path: "**", component: CoursesListComponent, canActivate: [AuthorizedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
