import type {Meta, StoryObj} from '@storybook/angular';
import {componentWrapperDecorator, moduleMetadata} from '@storybook/angular';
import { fn } from '@storybook/test';
import { MatButtonModule } from '@angular/material/button';
import {ButtonComponent, ButtonType} from '../lib/components/button/button.component';
// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<ButtonComponent> = {
  title: 'UI/MatButton',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    buttonType: {
      control: { type: 'select' }, options: ButtonType
    },
    color: {
      control: 'color',
    },
    isDisabled: {
      defaultValue: false,
      control: 'boolean',
    }
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { handleClick: fn() },
  decorators: [
    // With template
    componentWrapperDecorator((story) => `<div style="margin: 1em">${story}</div>`),
    moduleMetadata({
      imports: [ButtonComponent, MatButtonModule],
      declarations: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<ButtonComponent>;

export const Default: Story = {
  args: {
    buttonType: ButtonType.Basic,
    color: 'primary',
    label: 'Default',
    isDisabled: false
  },
};

export const Primary: Story = {
  args: {
    buttonType: ButtonType.Raised,
    color: 'primary',
    label: 'Primary',
    isDisabled: false
  },
};

export const Secondary: Story = {
  args: {
    buttonType: ButtonType.Flat,
    color: 'accent',
    label: 'Secondary',
    isDisabled: false
  },
};

export const Warn: Story = {
  args: {
    buttonType: ButtonType.Flat,
    color: 'warn',
    label: 'Warn',
    isDisabled: false
  },
};

export const Icon: Story = {
  args: {
    buttonType: ButtonType.Icon,
    color: 'basic',
    label: 'search',
    isDisabled: false
  },
};


/*
export default meta;
type Story = StoryObj<List>;

export const ManyItems: Story = {
  args: {
    Selected: Selected.args.isSelected,
    Unselected: Unselected.args.isSelected,
  },
  render: (args) => ({
    props: args,
    template: `
      <app-list>
        <app-list-item [isSelected]="Selected"></app-list-item>
        <app-list-item [isSelected]="Unselected"></app-list-item>
        <app-list-item [isSelected]="Unselected"></app-list-item>
      </app-list>
    `,
  }),
};*/
