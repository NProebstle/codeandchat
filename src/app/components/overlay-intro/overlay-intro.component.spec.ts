import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverlayIntroComponent } from './overlay-intro.component';

describe('OverlayIntroComponent', () => {
  let component: OverlayIntroComponent;
  let fixture: ComponentFixture<OverlayIntroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverlayIntroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverlayIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
