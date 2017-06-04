import { TestBed, inject } from '@angular/core/testing';

import { LoginSignupDataService } from './login-signup-data.service';

describe('LoginSignupDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoginSignupDataService]
    });
  });

  it('should ...', inject([LoginSignupDataService], (service: LoginSignupDataService) => {
    expect(service).toBeTruthy();
  }));
});
