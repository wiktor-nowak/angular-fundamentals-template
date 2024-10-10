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
import { CourseInfoComponent } from "./features/course-info/course-info.component";
import { AdminGuard } from "./user/guards/admin.guard";

export const routes: Routes = [
  { path: "login", component: LoginFormComponent, canActivate: [NotAuthorizedGuard] },
  { path: "register", component: RegistrationFormComponent, canActivate: [NotAuthorizedGuard] },
  {
    path: "courses",
    children: [
      { path: "", component: CoursesListComponent },
      { path: "add", component: CourseFormComponent, canActivate: [AdminGuard] },
      { path: ":id", component: CourseInfoComponent },
      {
        path: "edit",
        children: [{ path: ":id", component: CourseFormComponent }],
        canActivate: [AdminGuard]
      }
    ],
    canActivate: [AuthorizedGuard]
  },
  { path: "**", component: CoursesListComponent, canActivate: [AuthorizedGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
