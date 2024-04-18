import {Meta, moduleMetadata, StoryObj} from '@storybook/angular';
import { ActivatedRoute } from '@angular/router';
import {FuseNavigationComponent} from "../lib/components/navigation/navigation.component";
import {FuseNavigationItem} from "../lib/types/fuse-navigation";
import {FuseNavigationModule} from "../lib/components/navigation/navigation.module";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";
import {StorybookTranslateModule} from "./storybook-translate.module";
import {TranslateModule} from "@ngx-translate/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";


// Mock Data
const mockData: FuseNavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'item',
    icon: 'heroicons_outline:home',
    url: '/dashboard',
    isFeatureFound: true
  },
  {
    id: 'management',
    title: 'Management',
    type: 'collapsable',
    icon: 'heroicons_outline:briefcase',
    children: [
      {
        id: 'users',
        title: 'Users',
        type: 'item',
        url: '/management/users',
        isFeatureFound: true
      },
      {
        id: 'roles',
        title: 'Roles',
        type: 'item',
        url: '/management/roles',
        isFeatureFound: true
      },
    ],
    isFeatureFound: true
  },
  {
    id: 'settings',
    title: 'translate:SETTINGS', // Translation key for title
    type: 'item',
    icon: 'heroicons_outline:cog',
    translate: 'SETTINGS', // Translation key for accessibility
    badge: {
      title: '3',
      bg: 'primary',
      fg: 'white',
    },
    url: '/settings',
    isFeatureFound: true
  },
  {
    id: 'documentation',
    title: 'Documentation',
    type: 'item',
    icon: 'heroicons_outline:book',
    externalUrl: true,
    openInNewTab: true,
    url: 'https://example.com/docs',
    isFeatureFound: true
  }
]

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
      }]
    }),
  ]
} as Meta<FuseNavigationComponent>;

type Story = StoryObj<FuseNavigationComponent>;
export const Default: Story = {
  args: {
    layout: 'vertical',
    navigation: mockData
  },
};
