/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RunsService } from './runs.service';

describe('Service: Runs', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RunsService]
    });
  });

  it('should ...', inject([RunsService], (service: RunsService) => {
    expect(service).toBeTruthy();
  }));
});
