import {applicationConfig, Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import {ActivatedRoute} from '@angular/router';

import {provideAnimations} from '@angular/platform-browser/animations';
import {FuseSidebarComponent} from "../lib/components/sidebar/sidebar.component";
import {FuseSidebarModule} from "../lib/components/sidebar/sidebar.module";

export default {
  title: 'UI/Sidebar',
  component: FuseSidebarComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideAnimations()],
    }),
    moduleMetadata({
      imports: [
        FuseSidebarModule,
      ],
      providers: [

      ]
    }),
  ]
} as Meta<FuseSidebarComponent>;

type Story = StoryObj<FuseSidebarComponent>;

export const Default: Story = {
  args: {
    name: 'Left Sidebar',
    key: 'left-sidebar',
    position: 'left'
  },
  render: (args) => ({
    props: args,
    template: `
      <fuse-sidebar [folded]="false" class="navbar-fuse-sidebar" lockedOpen="gt-md" name="navbar">
      <navbar>
      <ul>
        <li>Nav1</li>
        <li>Nav2</li>
      </ul>
</navbar>
</fuse-sidebar>
    `,
  }),
};
