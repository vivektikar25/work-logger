import { TestBed, inject } from '@angular/core/testing';

import { ToasterServiceService } from './toaster-service.service';

describe('ToasterServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ToasterServiceService]
    });
  });

  it('should ...', inject([ToasterServiceService], (service: ToasterServiceService) => {
    expect(service).toBeTruthy();
  }));
});
