import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appLogTail]',
  host: {
    '(scroll)': 'onScroll()'
  }
})

export class LogTailDirective {
  tailing:boolean = true;
  constructor(private el: ElementRef) { }

  @Input('appLogTail') set content(content:string) {
    this.el.nativeElement.innerText = content;
    if(this.tailing)
      this.el.nativeElement.scrollTop = this.el.nativeElement.scrollHeight;
  }

  onScroll() {
    const scrollHeight = this.el.nativeElement.scrollHeight;
    const height = this.el.nativeElement.offsetHeight;
    const scrollTop = this.el.nativeElement.scrollTop;
    this.tailing = scrollTop + height === scrollHeight;
  }
}
