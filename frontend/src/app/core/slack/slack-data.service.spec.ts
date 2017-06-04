import { TestBed, inject } from '@angular/core/testing';

import { SlackDataService } from './slack-data.service';

describe('SlackDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SlackDataService]
    });
  });

  it('should ...', inject([SlackDataService], (service: SlackDataService) => {
    expect(service).toBeTruthy();
  }));
});
