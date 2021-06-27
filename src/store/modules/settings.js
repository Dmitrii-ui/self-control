import settingsApi from '@/api/settings'

export default {
	namespaced: true,
	state() {
		return {
			isLoading: false,
			data: null,
			errors: null
		}
	},
	mutations: {
		updateSettingsStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		updateSettingsSuccess(state, payload) {
			state.isLoading = false
			state.data = payload
		},
		updateSettingsFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},
	},
	actions: {
		updateSettings(context, payload) {
			return new Promise((res, rej) => {
				context.commit('updateSettingsStart')
				settingsApi.updateSettings(payload)
					.then((data) => {
						context.commit('updateSettingsSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('updateSettingsFailure', e.message)
						rej(e)
					})
			})
		}
	},
	getters: {
		isLoading(state) {
			return state.isLoading
		},
		data(state) {
			return state.data
		},
		errors(state) {
			return state.errors
		},
	}
}