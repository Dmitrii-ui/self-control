import config from '@/config/index'
import storage from '@/helpers/localStorage'

function getAll(body) {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + `/subscribe`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': storage.getItem('accessToken')
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

function subscribe(body) {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + `/subscribe`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': storage.getItem('accessToken')
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

function unSubscribe(url) {
	return new Promise((resolve, rej) => {
		fetch(url, {
			method: 'DELETE',
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
	getAll,
	subscribe,
	unSubscribe
}