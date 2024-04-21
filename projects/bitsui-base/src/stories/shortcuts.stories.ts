import {applicationConfig, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {ActivatedRoute} from '@angular/router';
import {FuseShortcutsModule} from "../lib/components/shortcuts/shortcuts.module";
import {FuseShortcutsComponent} from "../lib/components/shortcuts/shortcuts.component";
import {MOCK_NAVIGATION_DATA} from "./data/data-navigation";
import {provideAnimations} from "@angular/platform-browser/animations";

export default {
  title: 'UI/Shortcuts',
  component: FuseShortcutsComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [
        FuseShortcutsModule,
      ],
      providers: [
        {
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
        }
      ]
    }),
  ]
} as Meta<FuseShortcutsComponent>;

type Story = StoryObj<FuseShortcutsComponent>;
export const Default: Story = {
  args: {

  },
};

export const Custom: Story = {
  args: {
    navigation: MOCK_NAVIGATION_DATA
  },
};
