import subscribesApi from '@/api/subscribes'

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
		getAllStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		getAllSuccess(state, payload) {
			state.isLoading = false
			state.data = payload
		},
		getAllFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},

		subscribeStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		subscribeSuccess(state, payload) {
			state.isLoading = false
		},
		subscribeFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},

		unSubscribeStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		unSubscribeSuccess(state, payload) {
			state.isLoading = false
		},
		unSubscribeFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},
	},
	actions: {
		getAll(context, payload) {
			return new Promise((res, rej) => {
				context.commit('getAllStart')
				subscribesApi.getAll()
					.then((data) => {
						context.commit('getAllSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('getAllFailure', e)
						rej(e)
					})
			})
		},
		subscribe(context, payload) {
			return new Promise((res, rej) => {
				context.commit('subscribeStart')
				subscribesApi.subscribe(payload)
				.then((data) => {
						context.commit('subscribeSuccess')
						res(data)
					})
					.catch((e) => {
						context.commit('subscribeFailure', e)
						rej(e)
					})
			})
		},
		unSubscribe(context, payload) {
			return new Promise((res, rej) => {
				context.commit('unSubscribeStart')
				subscribesApi.unSubscribe(payload)
				.then((data) => {
						context.commit('unSubscribeSuccess')
						res(data)
					})
					.catch((e) => {
						context.commit('unSubscribeFailure', e)
						rej(e)
					})
			})
		},
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