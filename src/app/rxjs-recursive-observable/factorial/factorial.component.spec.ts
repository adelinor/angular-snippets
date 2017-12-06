import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactorialComponent } from './factorial.component';
import { FactorialService } from './factorial.service';

describe('FactorialComponent', () => {
  let component: FactorialComponent;
  let fixture: ComponentFixture<FactorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorialComponent ],
      providers: [ FactorialService ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
