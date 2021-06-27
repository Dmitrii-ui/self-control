import profilesApi from '@/api/profiles'

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
		getProfilesStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		getProfilesSuccess(state, payload) {
			state.isLoading = false
			state.data = payload
		},
		getProfilesFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},

		getProfileStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		getProfileSuccess(state, payload) {
			state.isLoading = false
		},
		getProfileFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},
	},
	actions: {
		getProfiles(context, payload) {
			return new Promise((res, rej) => {
				context.commit('getProfilesStart')
				profilesApi.getProfiles(payload)
					.then((data) => {
						context.commit('getProfilesSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('getProfilesFailure', e)
						rej(e)
					})
			})
		},
		getProfileById(context, payload) {
			return new Promise((res, rej) => {
				context.commit('getProfileStart')
				profilesApi.getProfileById(payload)
				.then((data) => {
						context.commit('getProfileSuccess')
						res(data)
					})
					.catch((e) => {
						context.commit('getProfileFailure', e)
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