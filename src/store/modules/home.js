import homeApi from '@/api/home'

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
		getCurrentTasksStart(state, payload) {
			state.isLoading = true
			state.errors = null
		},
		getCurrentTasksSuccess(state, payload) {
			state.isLoading = false
			state.data = payload
		},
		getCurrentTasksFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},


		setTaskStart(state, payload) {
			state.errors = null
		},
		setTaskSuccess(state, payload) {
			
		},
		setTaskFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},

		completeTaskStart(state, payload) {
			state.errors = null
		},
		completeTaskSuccess(state, payload) {
			
		},
		completeTaskFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},

		updateAllTasksStart(state, payload) {
			state.errors = null
		},
		updateAllTasksSuccess(state, payload) {
			
		},
		updateAllTasksFailure(state, payload) {
			state.isLoading = false
			state.errors = payload
		},
	},
	actions: {
		getCurrentTasks(context) {
			return new Promise((res, rej) => {
				context.commit('getCurrentTasksStart')
				homeApi.getCurrentTasks()
					.then((data) => {
						context.commit('getCurrentTasksSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('getCurrentTasksFailure', e)
						rej(e)
					})
			})
		},
		setTask(context, payload) {
			return new Promise((res, rej) => {
				context.commit('setTaskStart')
				homeApi.setTask(payload)
					.then((data) => {
						context.commit('setTaskSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('setTaskFailure', e)
						rej(e)
					})
			})
		},
		completeTask(context, payload) {
			return new Promise((res, rej) => {
				context.commit('completeTaskStart')
				homeApi.completeTask(payload)
					.then((data) => {
						context.commit('completeTaskSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('completeTaskFailure', e)
						rej(e)
					})
			})
		},
		updateAllTasks(context, payload) {
			return new Promise((res, rej) => {
				context.commit('updateAllTasksStart')
				homeApi.sendAll(payload)
					.then((data) => {
						context.commit('updateAllTasksSuccess', data)
						res(data)
					})
					.catch((e) => {
						context.commit('updateAllTasksFailure', e)
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



