import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEventEditComponent } from './race-event-edit.component';

describe('RaceEventEditComponent', () => {
  let component: RaceEventEditComponent;
  let fixture: ComponentFixture<RaceEventEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEventEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEventEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
