import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.css']
})

export class ProgressBarComponent{
  _progress: number = 0;
  @Input() status: string = '';

  @Input()
  set progress(p:number){
    if(p === null || p === undefined) this._progress = 0;
    else this._progress = p;
    // console.log(p);
  }
  get progress(){
    return this._progress;
  }
}
