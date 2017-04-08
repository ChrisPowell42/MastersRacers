import { TestBed, async } from '@angular/core/testing';

import { APP_BASE_HREF } from '@angular/common';
import { AppComponent } from './app.component';
import { MaterialModule } from '@angular/material';

import { AppRoutingModule} from './Routing/app-routing.module';
import { DashboardComponent } from './Dashboard/dashboard.component';
import { PageNotFoundComponent } from './Dashboard/not-found.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        DashboardComponent,
        PageNotFoundComponent
      ],
      imports: [
        MaterialModule,
        AppRoutingModule
      ],
      providers: [ AppComponent, { provide : APP_BASE_HREF, useValue : '/' } ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Masters Race Management');
  }));

  it('should render title in a md-toolbar tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('md-toolbar').textContent).toContain('Masters Race Management');
  }));
});
