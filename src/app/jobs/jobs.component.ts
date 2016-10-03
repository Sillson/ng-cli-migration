import { Component, OnInit } from '@angular/core';
import { Response } from "@angular/http";
import { Router } from "@angular/router";
import { JobsService } from "../jobs.service";
import { RunsService } from "../runs.service";
import { Job } from "../../models/job";
import { Run } from "../../models/run";
import { SearchPipe } from "../search.pipe";
import { Title }     from '@angular/platform-browser';


@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
  providers: [JobsService, RunsService]
})

export class JobsComponent implements OnInit {

  constructor(private jobService: JobsService,
              private runService: RunsService,
              private router: Router,
              private titleService: Title) { }

  jobs: Job[] = [];
  forms: Object = {}
  search: string;

  ngOnInit() {
    this.fetchJobs();
    this.titleService.setTitle("G5 DataWarehouse");
  }

  fetchJobs() {
    this.jobService.jobs.subscribe((response:any) => {
      let data = response.json();

      // initialize the form backing objects
      for(let key in data){
        this.forms[data[key].name] = {}
      }
      this.jobs = data;
    });
  }

  runJob(jobName){
    this.runService.create(jobName, this.forms[jobName])
      .subscribe(
        (run:any) => {
          this.router.navigate(['Run', { run_id: (<Run>run).id }])
        },
        error => console.error(error),
        () => console.log(`${jobName} done`)
      )
    console.log(this.forms[jobName]);
  }

}