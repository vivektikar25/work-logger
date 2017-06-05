import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorklogBoardComponent } from './worklog-board.component';

describe('WorklogBoardComponent', () => {
  let component: WorklogBoardComponent;
  let fixture: ComponentFixture<WorklogBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorklogBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorklogBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
