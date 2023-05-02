module.exports = {
	rootDir: '../',
	moduleDirectories: ['<rootDir>/node_modules'],
	verbose: true,
	resetModules: true,
	testEnvironment: 'jsdom',
	transform: {
		'\\.js$': ['babel-jest', { configFile: './config/babel.config.js' }]
	}
}
