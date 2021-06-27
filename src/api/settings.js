import config from '@/config/index'
import storage from '@/helpers/localStorage'

function updateSettings(body) {
	let formData = new FormData()
	formData.append('name', body.name)
	formData.append('password', body.password)
	formData.append('newPassword', body.newPassword)
	formData.append('avatar', body.avatar)
	formData.append('dayEnd', body.dayEnd)
	return new Promise((resolve, rej) => {
		fetch(config.BASE_URL + `/settings`, {
			method: 'PATCH',
			headers: {
				'authorization': storage.getItem('accessToken')
			},
			body: formData
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
	updateSettings
}