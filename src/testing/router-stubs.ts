import { Component, Directive, Input, Injectable } from '@angular/core';
import { convertToParamMap, ParamMap } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Component({selector: 'router-outlet', template: ''})
export class RouterOutletStubComponent { }

@Directive({
selector: '[routerLink]',
host: {
    '(click)': 'onClick()'
}
})
export class RouterLinkStubDirective {

    @Input('routerLink') linkParams: any;
    navigatedTo: any = null;

    onClick() {
        this.navigatedTo = this.linkParams;
    }
}

@Injectable()
export class ActivatedRouteStub {

  // ActivatedRoute.paramMap is Observable
  private subject = new BehaviorSubject(convertToParamMap(this.testParamMap));
  paramMap = this.subject.asObservable();

  // Test parameters
  private _testParamMap: ParamMap;
  get testParamMap() { return this._testParamMap; }
  set testParamMap(params: {}) {
    this._testParamMap = convertToParamMap(params);
    this.subject.next(this._testParamMap);
  }

  // ActivatedRoute.snapshot.paramMap
  get snapshot() {
    return { paramMap: this.testParamMap };
  }
}