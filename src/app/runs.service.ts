import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Run } from "./models/run";

@Injectable()
export class RunsService {

  constructor(private http: Http) { }

  runs(jobName: string, page: number = 0) {
    return this.http.get(`/api/v1/jobs/${jobName}/runs?page=${page}`)
      .map((response:Response) => 
        response.json().map(elem => Run.from_object(elem))
      );
  }

  allRuns(page: number = 0) {
    return this.http.get(`/api/v1/runs?page=${page}`)
      .map((response:Response) =>
        response.json().map(elem => Run.from_object(elem))
      );
  }

  run(runId: string) {
    return this.http.get(`/api/v1/runs/${runId}`)
      .map((response:Response) => Run.from_object(response.json()) );
  }

  create(jobName, params){
    const headers: Headers = new Headers({ 'Content-Type': 'application/json'});
    return this.http.post(`/api/v1/jobs/${jobName}/runs`, JSON.stringify({ params }), { headers })
      .map((response:Response) => Run.from_object(response.json()) );
  }

}
