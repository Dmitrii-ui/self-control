import authApi from '@/api/auth'
import storage from '@/helpers/localStorage'

export default {
	namespaced: true,
	state() {
		return {
			isSubmitting: false,
			currentUser: null,
			isLoggedIn: null,
			validationErrors: null,
			isLoading: false
		}
	},
	actions: {
		register(context, payload) {
			return new Promise((resolve, reject) => {
				context.commit('registerStart')
				authApi.register(payload)
					.then((data) => {
						context.commit('registerSuccess', data)
						resolve(data)
					})
					.catch(async err => {
						context.commit('registerFailure', err.message)
						reject(err)
					})
			})
		},
		login(context, payload) {
			return new Promise((resolve, reject) => {
				context.commit('loginStart')
				authApi.login(payload)
					.then((data) => {
						context.commit('loginSuccess', data.user)
						storage.setItem('accessToken', data.token)
						resolve(data)
					})
					.catch(err => {
						context.commit('loginFailure', err.message)
						reject(err)
					})
			})
		},
		getUser(context, payload) {
			return new Promise((resolve, reject) => {
				context.commit('getUserStart')
				authApi.getUser()
					.then((data) => {
						context.commit('getUserSuccess', data)
						resolve(data)
					})
					.catch(err => {
						context.commit('getUserFailure', err.message)
						reject(err)
					})
			})
		},
	},
	mutations: {
		reset(state) {
			state.isSubmitting = false
			state.currentUser = null
			state.isLoggedIn = null
			state.validationErrors = null
			state.isLoading = false
		},

		setName(state, payload) {
			state.currentUser.name = payload
		},
		setAvatar(state, payload) {
			state.currentUser.avatar = payload
		},

		subscribe(state, payload) {
			state.currentUser.subscribes.push(payload)
		},
		unSubscribe(state, payload) {
			state.currentUser.subscribes.splice(payload, 1)
		},

		registerStart(state, payload) {
			state.isSubmitting = true
			state.validationErrors = null
		},
		registerSuccess(state, payload) {
			state.isSubmitting = false
		},
		registerFailure(state, payload) {
			state.isSubmitting = false
			state.validationErrors = payload
		},

		loginStart(state, payload) {
			state.isSubmitting = true
			state.validationErrors = null
		},
		loginSuccess(state, payload) {
			state.isSubmitting = false
			state.currentUser = payload
			state.isLoggedIn = true
		},
		loginFailure(state, payload) {
			state.isSubmitting = false
			state.validationErrors = payload
		},

		getUserStart(state, payload) {
			state.isLoading = true
		},
		getUserSuccess(state, payload) {
			state.isLoading = false
			state.currentUser = payload
			state.isLoggedIn = true
		},
		getUserFailure(state, payload) {
			state.isLoading = false
			state.isLoggedIn = false
			state.currentUser = null
		},
	},
	getters: {
		isSubmitting(state, getters, rootState, rootGetters) {
			return state.isSubmitting
		},
		validationErrors(state, getters, rootState, rootGetters) {
			return state.validationErrors
		},
		isLoggedIn(state, getters, rootState, rootGetters) {
			return state.isLoggedIn
		},
		currentUser(state, getters, rootState, rootGetters) {
			return state.currentUser
		},
		isLoading(state, getters, rootState, rootGetters) {
			return state.isLoading
		},
	}
}