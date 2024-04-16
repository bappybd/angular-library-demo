import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import  MatProxyButtonComponent  from '../lib/ui/button/mat-proxy-button.component';
// More on how to set up stories at: https://storybook.js.org/docs/angular/writing-stories/introduction
const meta: Meta<MatProxyButtonComponent> = {
  title: 'Example/MatButton',
  component: MatProxyButtonComponent,
  tags: ['autodocs'],
  render: (args: MatProxyButtonComponent) => ({
    props: {
      ...args,
    },
  }),
  argTypes: {
    color: {
      control: 'color',
    },
    isDisabled: {
      defaultValue: false,
      control: 'boolean',
    }
  },
  decorators: [
    moduleMetadata({
      imports: [MatProxyButtonComponent],
      declarations: [],
    }),
  ],
};
export default meta;
type Story = StoryObj<MatProxyButtonComponent>;

// More on writing stories with args: https://storybook.js.org/docs/angular/writing-stories/args
export const Primary: Story = {
  args: {
    color: 'primary',
    isDisabled: false
  },
};

export const Secondary: Story = {
  args: {
    color: 'accent',
    isDisabled: false
  },
};

export const Warn: Story = {
  args: {
    color: 'warn',
    isDisabled: false
  },
};
