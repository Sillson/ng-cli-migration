import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { RunsService } from "../runs.service";
import { Run } from "../../models/run";
import { Subscription } from 'rxjs/Rx'
import { OrderByPipe } from "../order-by.pipe";
import { ProgressBarComponent } from "../progress-bar/progress-bar.component"
import { KeysPipe } from "../keys.pipe";
import "rxjs/add/operator/take"

@Component({
  selector: 'app-runs',
  templateUrl: './runs.component.html',
  styleUrls: ['./runs.component.css'],
  providers: [RunsService]
})
export class RunsComponent implements OnInit, OnDestroy{
  runs: Run[] = [];
  logsOpen = {}
  jobName: string;
  pollingSubscription: Subscription;
  _page: number = 0;

  constructor(private router: Router, private runsService: RunsService) { }

  ngOnInit() {
    this.pollRuns();
  }

  ngOnDestroy() {
    this.pollingSubscription.unsubscribe()
  }

  pollRuns() {
    const reqObservable = this.jobName
      ? this.runsService.runs(this.jobName, this.page)
      : this.runsService.allRuns(this.page);
    this.pollingSubscription = reqObservable
      .take(1) // Execute without delay initially
      // .merge(Observable
      //   .interval(1000)
      //   .switchMap(() => reqObservable)
      // )
      .subscribe(
        (data:any) => this.runs = <Run[]>data,
        error => console.error(error)
      );
  }

  set page(newPage){
    this._page = newPage;
    this.pollRuns();
  }

  get page(){
    return this._page;
  }

  goToRun(id){
    this.router.navigate( ['Run', { run_id: id }] );
  }

}
