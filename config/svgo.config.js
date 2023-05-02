const crypto = require('crypto')

module.exports = {
	multipass: true,
	plugins: [
		{
			name: 'preset-default',
			params: {
				overrides: {
					inlineStyles: {
						onlyMatchedOnce: false
					},
					removeViewBox: false,
					cleanupIDs: {
						prefix: {
							/**
							 * Generate random attribute ids on child tags of SVGs to avoid conflicts between SVGs
							 * @returns {String} Hash
							 */
							toString() {
								const randomId = crypto.randomBytes(20).toString('hex').slice(0, 4)
								return `icon-${randomId}`
							}
						}
					}
				}
			}
		},
		{
			name: 'convertStyleToAttrs' // Disabled by default since v2.1.0
		}
	]
}
