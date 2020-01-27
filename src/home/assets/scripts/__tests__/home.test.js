'use strict'

import Home from '../home'

const getInstance = () => {
	const home = new Home()
	return home
}
let home

beforeEach(() => {
	home = getInstance()
})

describe('home tests', () => {
	it('should init the home class', () => {
		home.init = jest.fn()

		home.init()

		expect(home.init).toHaveBeenCalled()
	})
})
