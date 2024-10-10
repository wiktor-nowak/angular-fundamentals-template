import { AfterViewInit, Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { CoursesService } from "@app/services/courses.service";
import { AuthorData } from "@app/shared/types/authors";
import { CourseData } from "@app/shared/types/courses";
import { FaIconLibrary } from "@fortawesome/angular-fontawesome";
import { fas, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: "app-course-form",
  templateUrl: "./course-form.component.html",
  styleUrls: ["./course-form.component.scss"]
})
export class CourseFormComponent implements AfterViewInit {
  constructor(
    public fb: FormBuilder,
    public library: FaIconLibrary,
    private coursesService: CoursesService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    library.addIconPacks(fas);
  }
  faTrashCanIcon = faTrashCan;
  faPlusIcon = faPlus;

  isEdited: boolean;

  courseForm = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(2)]],
    description: ["", [Validators.required, Validators.minLength(2)]],
    authors: this.fb.array([], Validators.required),
    author: ["", [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/)]],
    otherAuthors: this.fb.array([]),
    duration: [null, Validators.required]
  });
  submitted: boolean = false;

  ngAfterViewInit(): void {
    this.coursesService.getAllAuthors().subscribe((response) => {
      response.result.forEach((fetchedAuthor) => {
        this.courseForm.controls.otherAuthors.push(this.fb.control(fetchedAuthor));
      });
    });
    this.route.pathFromRoot[2].url.subscribe((value) => {
      this.isEdited = value[0].path === "edit";
      console.log(this.isEdited);
    });
  }

  get author() {
    return this.courseForm.get("author");
  }

  loadData() {
    // this.courseForm.setValue({
    //   title:
    // })
  }

  handleSubmit() {
    this.submitted = true;
    const course = {
      title: this.courseForm.controls.title.value,
      description: this.courseForm.controls.description.value,
      duration: this.courseForm.controls.duration.value || 0,
      authors: this.courseForm.controls.authors.value.map((author: AuthorData) => author.id)
    };
    console.log(course);
    if (this.courseForm.valid) {
      this.coursesService.createCourse(course);
      this.router.navigateByUrl("/courses");
    }
  }

  createNewAuthor() {
    if (!this.author?.errors && this.courseForm.controls.author.value) {
      this.coursesService.createAuthor(this.author.value);
      this.author?.reset();
    }
  }
  addAuthor(ind: number) {
    this.courseForm.controls.authors.push(this.courseForm.controls.otherAuthors.controls[ind]);
    this.courseForm.controls.otherAuthors.removeAt(ind);
  }

  deleteAuthor(ind: number) {
    this.courseForm.controls.otherAuthors.push(this.courseForm.controls.authors.controls[ind]);
    this.courseForm.controls.authors.removeAt(ind);
  }

  checkIsValid(field: string) {
    return (
      this.courseForm.get(field)?.invalid && (this.courseForm.get(field)?.touched || this.submitted)
    );
  }

  getOtherAuthorNames() {
    return this.courseForm.get("otherAuthors").value.map((author: AuthorData) => author.name);
  }
  getAuthorNames() {
    return this.courseForm.get("authors").value.map((author: AuthorData) => author.name);
  }

  goBack() {
    this.router.navigateByUrl("/courses");
  }
}
