import { TestBed, inject } from '@angular/core/testing';

import { JiraDataService } from './jira-data.service';

describe('JiraDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JiraDataService]
    });
  });

  it('should ...', inject([JiraDataService], (service: JiraDataService) => {
    expect(service).toBeTruthy();
  }));
});
