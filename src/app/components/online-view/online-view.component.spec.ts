import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineViewComponent } from './online-view.component';

describe('OnlineViewComponent', () => {
  let component: OnlineViewComponent;
  let fixture: ComponentFixture<OnlineViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
