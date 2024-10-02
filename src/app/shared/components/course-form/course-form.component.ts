import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators
} from '@angular/forms';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas, faTrashCan, faPlus } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss'],
})
export class CourseFormComponent {
  constructor(public fb: FormBuilder, public library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
  faTrashCanIcon = faTrashCan;
  faPlusIcon = faPlus;
  courseForm = this.fb.group({
    title:['', [Validators.required, Validators.minLength(2)]],
    description:['', [Validators.required, Validators.minLength(2)]],
    authors: this.fb.array([], Validators.required),
    author:['', [Validators.minLength(2), Validators.pattern(/^[a-zA-Z0-9]+$/
    )]],
    otherAuthors: this.fb.array([]),
    duration:[null, Validators.required]
  });
  submitted: boolean = false

  get author() { return this.courseForm.get('author'); }

  handleSubmit() {
    this.submitted = true
  }

  // createControl(name: string) {
  //   return this.fb
  // }

  createNewAuthor () {
    if(!this.author?.errors && this.courseForm.controls.author.value) {
      this.courseForm.controls.otherAuthors.push(this.fb.control(this.courseForm.controls.author.value))
      this.author?.reset()
    }
  }
  addAuthor (ind: number) {
    this.courseForm.controls.authors.push(this.courseForm.controls.otherAuthors.controls[ind])
    this.courseForm.controls.otherAuthors.removeAt(ind)
  }

  deleteAuthor (ind: number) {
    this.courseForm.controls.otherAuthors.push(this.courseForm.controls.authors.controls[ind])
    this.courseForm.controls.authors.removeAt(ind)
  }

  checkIsValid(field: string) {
    return this.courseForm.get(field)?.invalid && (this.courseForm.get(field)?.touched || this.submitted)
  }
}
