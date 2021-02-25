import { createElement, Fragment } from 'jsx-dom'

/**
 * Home module
 */
export default class Home {
	init() {
		console.log('Home')
		document.querySelector('#app').appendChild(
			<>
				<svg fill="green">
					<use href="#check"></use>
				</svg>
			</>
		)
	}
}
