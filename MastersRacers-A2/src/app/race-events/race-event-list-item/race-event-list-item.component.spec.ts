import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RaceEventListItemComponent } from './race-event-list-item.component';

describe('RaceEventListItemComponent', () => {
  let component: RaceEventListItemComponent;
  let fixture: ComponentFixture<RaceEventListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RaceEventListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RaceEventListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
