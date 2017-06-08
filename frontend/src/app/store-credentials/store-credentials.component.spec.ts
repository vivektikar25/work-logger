import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCredentialsComponent } from './store-credentials.component';

describe('StoreCredentialsComponent', () => {
  let component: StoreCredentialsComponent;
  let fixture: ComponentFixture<StoreCredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreCredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreCredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
