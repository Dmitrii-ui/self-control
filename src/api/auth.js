import config from '@/config/index.js'
import storage from '@/helpers/localStorage'

function register(body) {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + '/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(body)
		})
		.then(async (data) => {
			const res = await data.json()
			if(data.ok) {
				resolve(res)
			} else {
				rej(res)
			}
		})
	})
}

function login(body) {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + '/auth/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8'
			},
			body: JSON.stringify(body)
		})
		.then(async (data) => {
			const res = await data.json()
			if(data.ok) {
				resolve(res)
			} else {
				rej(res)
			}
		})
	})
}

function getUser() {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + '/auth/user', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': storage.getItem('accessToken')
			}
		})
		.then(async (data) => {
			const res = await data.json()
			if(data.ok) {
				resolve(res)
			} else {
				rej(res)
			}
		})
	})
}


export default {
	register,
	login,
	getUser
}