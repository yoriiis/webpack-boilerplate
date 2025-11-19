/**
 * Home module
 */
export default class Home {
	init() {
		console.log('Home')
		document.querySelector('#app').appendChild(
			<svg fill="green">
				<title>Check</title>
				<use href="#check"></use>
			</svg>
		)
	}
}
