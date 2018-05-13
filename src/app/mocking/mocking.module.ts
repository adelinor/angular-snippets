import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';

import { SampleService } from './sample.service';
import { MockSampleService } from './mock-sample.service';

@NgModule({
})
export class MockingModule {
  constructor (@Optional() @SkipSelf() parentModule: MockingModule) {
    if (parentModule) {
      throw new Error(
        'MockingModule is already loaded. Import it in the AppModule only');
    }
  }

  static forMocks(): ModuleWithProviders {
    return {
        ngModule: MockingModule,
        providers: [
          { provide: SampleService, useClass: MockSampleService }
        ]
      };
  }

  static forRoot(): ModuleWithProviders {
    return {
        ngModule: MockingModule,
        providers: [
          SampleService
        ]
      };
  }
}
