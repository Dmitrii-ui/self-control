import config from '@/config/index'
import storage from '@/helpers/localStorage'

function getProfiles(body) {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + `/profiles`, {
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

function getProfileById(url) {
	return new Promise((resolve, rej) => {
		fetch(url, {
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
	getProfiles,
	getProfileById
}