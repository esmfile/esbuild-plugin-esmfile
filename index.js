/// <reference types="esbuild" />
/**
 * @returns {Plugin}
 * @see {https://github.com/evanw/esbuild/issues/3653#issuecomment-1951577552}
 */
export function esmfile_() {
	return {
		name: 'esmfile',
		setup(build) {
			build.onResolve(
				{ filter: /\.file\.(js|ts)(\?.*)?$/ },
				async ({ path, ...args })=>{
					// Avoid recursion in resolve() below
					if (args.pluginData === 'esmfile') return
					// Tell esbuild to resolve the path
					const result = await build.resolve(path, { ...args, pluginData: 'esmfile' })
					if (result.errors.length > 0) return { errors: result.errors }
					return {
						path: result.path.slice(0, -8), // "svg.file.js" => ".svg"
						pluginData: 'esmfile:' + result.path + result.suffix, // Save the original path
					}
				}
			)
			build.onLoad(
				{ filter: /.*$/ },
				async ({ pluginData })=>{
					// Load the original path
					if (!pluginData?.startsWith('esmfile:')) return
					const path = pluginData.slice('esmfile:'.length)
					const contents = await import(path).then(mod=>mod.default())
					return { contents, loader: 'file' }
				}
			)
		},
	}
}
export default esmfile_
