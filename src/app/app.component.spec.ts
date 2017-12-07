import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FactorialService } from './rxjs-recursive-observable/factorial/factorial.service';
import { RouterOutletStubComponent } from '../testing/router-stubs';
describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        RouterOutletStubComponent
      ],
      providers: [
        FactorialService
      ]      
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
