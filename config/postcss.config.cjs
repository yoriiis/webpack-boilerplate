const crypto = require('node:crypto')
const md5 = (string) => crypto.createHash('md5').update(string).digest('hex')

module.exports = (api) => {
	const isProduction = api.mode === 'production'

	return {
		plugins: [
			'postcss-import',
			'postcss-url',
			[
				'postcss-custom-properties-transformer',
				{
					transformer: ({ property }) => (isProduction ? md5(property).slice(0, 4) : property)
				}
			],
			'postcss-nested',
			[
				'postcss-preset-env',
				{
					stage: 2,
					features: {
						'nesting-rules': false,
						'custom-properties': {
							warnings: true,
							preserve: true
						}
					}
				}
			],
			[
				'postcss-custom-media',
				{
					preserve: false
				}
			]
		]
	}
}
