import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {ActivatedRoute} from '@angular/router';
import {FuseNavigationComponent} from "../lib/components/navigation/navigation.component";
import {FuseNavigationModule} from "../lib/components/navigation/navigation.module";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {StorybookTranslateModule} from "./storybook-translate.module";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MOCK_NAVIGATION_DATA} from "./data/data-navigation";
import {FuseNavigationService} from "../lib/components/navigation/navigation.service";
import {FuseNavigationItem} from "../lib/types/fuse-navigation";

class MockFuseNavigationService extends FuseNavigationService{
  constructor() {
    super();
    this.register('main', MOCK_NAVIGATION_DATA as unknown as FuseNavigationItem);
    this.setCurrentNavigation('main');
  }
}

export default {
  title: 'UI/Navigation',
  component: FuseNavigationComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        NgIf,
        ReactiveFormsModule,
        FuseNavigationModule,
        TranslateModule,
        StorybookTranslateModule,
        BrowserAnimationsModule
      ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get(): string {
                return '123';
              },
            },
          },
        },
      },
        { provide: FuseNavigationService, useClass: MockFuseNavigationService }
      ]
    }),
  ]
} as Meta<FuseNavigationComponent>;

type Story = StoryObj<FuseNavigationComponent>;
export const Primary: Story = {
  name: 'I am the primary',
  args: {
    layout: 'vertical',
    navigation: MOCK_NAVIGATION_DATA
  },
};
