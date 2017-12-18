import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { FactorialComponent } from './factorial.component';
import { FactorialService } from './factorial.service';
import { ActivatedRouteStub } from '../../../testing/router-stubs';

describe('FactorialComponent', () => {
  let component: FactorialComponent;
  let fixture: ComponentFixture<FactorialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactorialComponent ],
      providers: [ FactorialService, {provide: ActivatedRoute, useValue: new ActivatedRouteStub() } ]

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
