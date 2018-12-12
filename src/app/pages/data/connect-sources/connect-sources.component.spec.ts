import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectSourcesComponent } from './connect-sources.component';

describe('ConnectSourcesComponent', () => {
  let component: ConnectSourcesComponent;
  let fixture: ComponentFixture<ConnectSourcesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectSourcesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
