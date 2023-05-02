module.exports = {
	rootDir: '../',
	moduleDirectories: ['<rootDir>/node_modules'],
	verbose: true,
	resetModules: true,
	testEnvironment: 'jsdom',
	transformIgnorePatterns: ['<rootDir>/node_modules/(?!jsx-dom)'],
	transform: {
		'\\.js$': ['babel-jest', { configFile: './config/babel.config.js' }]
	}
}
