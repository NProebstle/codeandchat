import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayHandlerComponent } from './overlay-handler.component';

describe('OverlayHandlerComponent', () => {
  let component: OverlayHandlerComponent;
  let fixture: ComponentFixture<OverlayHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
