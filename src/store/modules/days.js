import daysApi from '@/api/days'

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
		getDaysStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		getDaysSuccess(state, payload) {
			state.isLoading = false
			state.data = payload
		},
		getDaysFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},

		getDayStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		getDaySuccess(state, payload) {
			state.isLoading = false
		},
		getDayFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},
	},
	actions: {
		getDays(context, payload) {
			return new Promise((res, rej) => {
				context.commit('getDaysStart')
				daysApi.getDays(payload)
					.then((data) => {
						context.commit('getDaysSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('getDaysFailure', e)
						rej(e)
					})
			})
		},
		getDayById(context, payload) {
			return new Promise((res, rej) => {
				context.commit('getDayStart')
				daysApi.getDayById(payload)
				.then((data) => {
						context.commit('getDaySuccess')
						res(data)
					})
					.catch((e) => {
						context.commit('getDayFailure', e)
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