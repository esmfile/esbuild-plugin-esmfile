import { build } from 'esbuild'
import { dirname, join } from 'node:path'
import { test } from 'uvu'
import { equal } from 'uvu/assert'
import esmfile_ from './index.js'
test('esmfile', async ()=>{
	// stdin config does not with onLoad
	// see https://github.com/evanw/esbuild/issues/720
	const dir = dirname(new URL(import.meta.url).pathname)
	const no_color_svg = await build({
		entryPoints: [join(dir, './_fixtures/index.svg.file.ts')],
		plugins: [esmfile_()],
		write: false,
	}).then(result=>new TextDecoder().decode(result.outputFiles[0].contents))
	const green_svg = await build({
		entryPoints: [join(dir, './_fixtures/index.svg.file.ts?stroke=green')],
		plugins: [esmfile_()],
		write: false,
	}).then(result=>new TextDecoder().decode(result.outputFiles[0].contents))
	equal(no_color_svg.includes('stroke="currentColor"'), true)
	equal(no_color_svg.includes('stroke="green"'), false)
	equal(green_svg.includes('stroke="currentColor"'), false)
	equal(green_svg.includes('stroke="green"'), true)
})
test.run()
