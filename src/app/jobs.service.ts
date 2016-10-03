import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class JobsService {

  constructor(private http: Http) { }

  get jobs() {
    return this.http.get('/api/v1/jobs');
  }

}
