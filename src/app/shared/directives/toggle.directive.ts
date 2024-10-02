import { Directive, ElementRef, Renderer2} from "@angular/core";

  @Directive({
    selector: '[appTogglePassword]',
    exportAs: 'appTogglePassword'
  })
  export class TogglePasswordDirective  {
    isPassword: boolean = true
    constructor(private el: ElementRef, private renderer: Renderer2) {}

    togglePassword() {
        if (this.el.nativeElement.getAttribute('type') === 'password') {
            this.renderer.setAttribute(this.el.nativeElement, 'type', 'text')
            this.isPassword = false
        } else {
            this.renderer.setAttribute(this.el.nativeElement, 'type', 'password')
            this.isPassword = true
        }
    }
  }