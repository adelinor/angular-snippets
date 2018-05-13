import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SampleService } from './sample.service';
import { MockSampleService } from './mock-sample.service';

export interface MockingModuleConfig {
  useMocks: boolean
}

@NgModule({
  imports:      [ CommonModule ],
  providers:    [ SampleService ]
})
export class MockingModule {
  constructor (@Optional() @SkipSelf() parentModule: MockingModule) {
    if (parentModule) {
      throw new Error(
        'MockingModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: MockingModuleConfig): ModuleWithProviders {
    let providers;
    if (config.useMocks) {
      providers = [
        { provide: SampleService, useClass: MockSampleService }
      ]
    } else {
      providers = [ SampleService ]
    }
    return {
      ngModule: MockingModule,
      providers: providers
    };
  }
}
