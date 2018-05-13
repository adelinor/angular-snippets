import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MockingComponent } from './mocking.component';
import { SampleService } from './sample.service';
import { MockSampleService } from './mock-sample.service';

describe('MockingComponent', () => {
  let component: MockingComponent;
  let fixture: ComponentFixture<MockingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MockingComponent ],
      providers: [
        { provide: SampleService, useClass: MockSampleService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MockingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
