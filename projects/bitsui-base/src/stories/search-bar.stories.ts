import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { FuseSearchBarComponent } from '../lib/components/search-bar/search-bar.component';
import { FuseConfigService } from '../lib/services/config.service';
import { Subject } from 'rxjs';
import ButtonComponent, {ButtonType} from "../lib/ui/button/button.component";

// Mocking the FuseConfigService
class MockFuseConfigService {
  config = new Subject<any>();
}

export default {
  title: 'UI/Fuse Search Bar',
  component: FuseSearchBarComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      providers: [
        { provide: FuseConfigService, useClass: MockFuseConfigService }
      ],
    }),
  ],
} as Meta<FuseSearchBarComponent>;

type Story = StoryObj<FuseSearchBarComponent>;
export const Default: Story = {
  args: {
    collapsed: true
  },
};

export const Expanded: Story = {
  args: {
    collapsed: true
  },
};

export const Collapsed: Story = {
  args: {
    collapsed: false
  },
};

export const WithSearch = () => ({
  component: FuseSearchBarComponent,
  props: {},
  template: `<fuse-search-bar (inputEventEmitter)="onSearch($event)"></fuse-search-bar>`,
  methods: { onSearch: action('Search') },
});
