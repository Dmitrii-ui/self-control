import getDate from '@/helpers/getCurrentDate'
import config from '@/config/index'
import storage from '@/helpers/localStorage'
import getSeconds from '@/helpers/getSeconds'

function getCurrentTasks() {
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + `/day?date=${getDate(':')}`, {
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

function setTask(body) {
	return new Promise((resolve, rej) => {
		body.date = getDate(':')
		body.time = getSeconds()
		fetch(config.BASE_URL + `/day`, {
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

function completeTask(body) {
	return new Promise((resolve, rej) => {
		body.date = getDate(':')
		fetch(config.BASE_URL + `/day/${body._id}`, {
			method: 'PATCH',
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

function sendAll(body) {
	return new Promise((resolve, rej) => {
		body.date = getDate(':')
		body.time = getSeconds()
		fetch(config.BASE_URL + `/day`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json; charset=utf-8',
				'authorization': storage.getItem('accessToken')
			},
			body: JSON.stringify(body),
			keepalive: true
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
	getCurrentTasks,
	setTask,
	completeTask,
	sendAll
}