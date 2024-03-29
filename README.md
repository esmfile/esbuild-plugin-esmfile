[//]: @formatter:off
# esmfile

Import *.file.ts/*.file.js modules to build files using the file loader...For example, importing rocket-launch.svg.file.ts builds rocket-launch.svg in the build output directory during build time.

## install

```
npm i -D esbuild-plugin-esmfile
```

## usage

Build file

```ts
import { build } from 'esbuild'
import esmfile from 'esbuild-plugin-esmfile'
await build({
  entryPoints: [/* source code entry point */],
  plugins: [esmfile()]
})
```

Component file

```ts
import rocket_launch_svg from './rocket-launch.svg.file.js?stroke=green'
// rocket_launch_svg is the path to the rocket-launch-[hash].svg
// file in the esbuild output directory.
// The stroke of the icon is green.
export function html_() {
  return `
<doctype<!DOCTYPE html>
<html>
  <head>
    <link rel="icon" type="image/svg+xml" href="${rocket_launch_svg}">
  </head>
  <body>
    <img src="${rocket_launch_svg}">
  </body>
</html>
  `.trim()
}
```

rocket-launch.svg.file.ts
```ts
export default ()=>{
  const url = new URL(import.meta.url)
  const stroke = url.searchParams.get('stroke') ?? 'currentColor'
  // language=svg
  return (
    '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" '
    + 'stroke="'+ stroke + '" '
    + 'class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" /></svg>'
  )
}
```
[//]: @formatter:on
