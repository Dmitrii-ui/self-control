export default {
	setItem(key, data) {
		try {
			localStorage.setItem(key, JSON.stringify(data)) 
		} catch(e) {
			console.log('error getting item from local storage', e)
		}
	},
	getItem(key) {
		try {
			return JSON.parse(localStorage.getItem(key))
		} catch(e) {
			console.log('error saving item from local storage', e)
			return null
		}
	},
	removeItem(key) {
		try {
			localStorage.removeItem(key)
		} catch(e) {
			return null
		}
	}
}