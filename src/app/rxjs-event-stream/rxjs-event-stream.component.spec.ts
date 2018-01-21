import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsEventStreamComponent } from './rxjs-event-stream.component';
import { MovieSearchService } from './movie-search.service';

describe('RxjsEventStreamComponent', () => {
  let component: RxjsEventStreamComponent;
  let fixture: ComponentFixture<RxjsEventStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RxjsEventStreamComponent ],
      providers: [ MovieSearchService ]
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
