import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEventDefaultComponent } from './race-event-default.component';

describe('RaceEventDefaultComponent', () => {
  let component: RaceEventDefaultComponent;
  let fixture: ComponentFixture<RaceEventDefaultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEventDefaultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEventDefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
