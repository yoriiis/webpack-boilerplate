module.exports = {
	parser: '@babel/eslint-parser',
	parserOptions: {
		ecmaVersion: 6,
		ecmaFeatures: {
			impliedStrict: true,
			experimentalObjectRestSpread: true,
			jsx: true
		},
		babelOptions: { configFile: './config/babel.config.js' }
	},

	env: {
		browser: true,
		node: true,
		jest: true
	},

	extends: ['standard', 'plugin:react/recommended'],

	rules: {
		indent: ['error', 'tab', { ignoredNodes: ['TemplateLiteral *'] }],
		'no-tabs': 0,
		'space-before-function-paren': [
			'error',
			{ anonymous: 'always', named: 'never', asyncArrow: 'always' }
		],
		'react/prop-types': 0,
		'react/display-name': 0,
		'react/jsx-key': 0,
		'react/no-unknown-property': ['error', { ignore: ['innerHTML'] }],
		'react/react-in-jsx-scope': 'off',
		'react/jsx-uses-react': 'off'
	},

	globals: {
		document: false,
		window: false,
		__webpack_public_path__: true
	},

	settings: {
		react: {
			version: '0' // Remove the warning of the missing React package
		}
	},

	ignorePatterns: ['node_modules', 'dist']
}
