import {
  NgModule,
  ModuleWithProviders,
  Optional,
  SkipSelf,
} from '@angular/core';
import { FUSE_CONFIG } from './services/config.service';

// @dynamic
@NgModule()
export class FuseModule {
  constructor(@Optional() @SkipSelf() parentModule: FuseModule) {
    if (parentModule) {
      throw new Error(
        'FuseModule is already loaded. Import it in the AppModule only!'
      );
    }
  }

  public static forRoot(config: any): ModuleWithProviders<FuseModule> {
    return {
      ngModule: FuseModule,
      providers: [{ provide: FUSE_CONFIG, useValue: config }],
    };
  }
}
