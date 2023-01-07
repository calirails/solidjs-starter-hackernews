# SolidStart Hackernews Example

Hackernews example powered by [`solid-start`](https://start.solidjs.com);

```bash
npm init solid@latest -- --template hackernews
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/solidjs/solid-start/tree/main/examples/hackernews)

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Debugging

Client side debugging requires sourceMap to be set. Since we are using Vite, it's necessary to set it via `{build: {sourceMap: true }}` option within vite.config.ts. This provides client side
debugging within the browser. Server side debugging via VSCode at this time with solid-start is
difficult/broken since code is not attaching or stopping at breakpoints. Adding `debugger;` on page seem to help trigger breakpoints; however, the component api/ handlers are still somewhat
unpredictable.

## Building

SolidStart apps are built with _adapters_, which optimise your project for deployment to different environments.

By default, `npm run build` will generate a Node app that you can run with `npm start`. To use a different adapter, add it to the `devDependencies` in `package.json` and specify in your `vite.config.js`.
