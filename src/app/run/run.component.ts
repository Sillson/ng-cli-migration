import { Component, OnInit, OnDestroy } from '@angular/core';
import { RunsService } from '../runs.service';
import { Routes } from '@angular/router';
import { Run } from "../../models/run";
import { Observable, Subscription } from 'rxjs/Rx'
import { KeysPipe } from "../keys.pipe";
import { LogTailDirective } from "../log-tail.directive";
import { ProgressBarComponent } from "../progress-bar/progress-bar.component";

@Component({
  selector: 'app-run',
  templateUrl: './run.component.html',
  styleUrls: ['./run.component.css'],
  providers: [RunsService, LogTailDirective, ProgressBarComponent]
})
export class RunComponent implements OnInit, OnDestroy {
  run: Run = new Run();
  runningTime: number = null;
  runId: string;
  pollingSubscription: Subscription;
  
  constructor(private runsService: RunsService) { }

  ngOnInit() {
    this.startPoller();
  }

  ngOnDestroy() {
    // this.pollingSubscription.unsubscribe()
    this.stopPoller();
  }

  pollerHandler: any;
  startPoller(){
    this.pollRun();
    this.pollerHandler = setInterval(() => {
      this.pollRun();
    }, 1000);
  }

  stopPoller(){
    if(this.pollerHandler)
      clearInterval(this.pollerHandler);
    this.pollerHandler = null;
  }

  pollRun() {
    this.runsService.run(this.runId)
      .subscribe(
        (data:any) => {
          Run.from_object(<Run>data, this.run);
          this.updateRunningTime();
          if(this.run.status === 'COMPLETE' || this.run.status === 'ERROR')
            this.stopPoller();
        },
        error => console.error(error)
      );
  }

  updateRunningTime(){
    if(this.run && this.run.started_at){
      let endTime:Date = this.run.completed_at ? this.run.completed_at : new Date();
      this.runningTime = (endTime.getTime() - this.run.started_at.getTime())/1000.0;
      this.runningTime = Math.round(this.runningTime*100)/100.0
    }
  }
}