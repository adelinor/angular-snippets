import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsEventStreamComponent } from './rxjs-event-stream.component';

describe('RxjsEventStreamComponent', () => {
  let component: RxjsEventStreamComponent;
  let fixture: ComponentFixture<RxjsEventStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsEventStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RxjsEventStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
