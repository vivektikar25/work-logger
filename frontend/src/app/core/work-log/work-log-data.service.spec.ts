import { TestBed, inject } from '@angular/core/testing';

import { WorkLogDataService } from './work-log-data.service';

describe('WorkLogDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WorkLogDataService]
    });
  });

  it('should ...', inject([WorkLogDataService], (service: WorkLogDataService) => {
    expect(service).toBeTruthy();
  }));
});
