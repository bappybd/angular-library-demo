# AngularStorybook

```
npm install -g @angular/cli
ng new storybook-workspace --create-application=false && cd storybook-workspace
ng g library bitsui-base && ng g application playground --defaults --style=scss --routing
npx storybook@latest init
```

## Configuration

```
// From
"extends": "",
// To
"extends": "../projects/design-system/tsconfig.lib.json"
// From
"include": ["../src/**/*", "../projects/**/*"],
// To
"include": ["../stories/**/*", "../src/**/*", "../projects/**/*"],
```

## Development
```
npx husky-init
```
