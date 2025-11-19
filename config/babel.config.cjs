module.exports = (api) => {
	api.cache(true)

	const presets = [
		'@babel/preset-env',
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
				importSource: 'jsx-dom'
			}
		]
	]
	const plugins = ['babel-plugin-dynamic-import-node', '@babel/proposal-class-properties']

	return {
		presets,
		plugins
	}
}
