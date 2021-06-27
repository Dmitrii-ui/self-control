<template>
	<div>
		<div v-if="isLoading" class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Загрузка...</span>
			</div>
		</div>
		<template v-else-if="profile">
			<h2 class="my-4 text-light d-flex justify-content-center">Профиль {{profile.name}}</h2>	
			<div class="img-wrapper d-flex justify-content-center mb-4">
				<img :src="'https://nameless-refuge-99512.herokuapp.com/' + profile.avatar" alt="" class="profile-avatar">
			</div>
			<div class="col-md-8 mx-auto">
				<div class="information-wrapper py-2 px-2 bg-light rounded">
					<p class="fs-5">
						Средний коэффициент выполненных задач за три дня: <b>{{profile.estimatedSuccessTasks}}%
						</b>
					</p>
					<p class="fs-5">
						Средний коэффициент уделенного времени на задачи за три дня(в секундах): <b>{{profile.estimatedSuccessTime}}с
						</b>
					</p>
					<div
						v-if="isSubscribed" 
						class="d-flex justify-content-between">
						<button :disabled="disabled" @click="unSubscribe" class="btn btn-primary">Отписаться</button>
					</div>
					<div v-else class="d-flex justify-content-between">
						<button :disabled="disabled" @click="subscribe" type="submit" class="btn btn-primary">Подписаться</button>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import config from '@/config/index'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			profile: null,
			disabled: false
		}
	},
	methods: {
		subscribe() {
			this.disabled = true
			this.$store.dispatch('subscribes/subscribe', {id: this.profile._id})
				.then((data) => {
					this.$store.commit('auth/subscribe', data.userId)
					this.disabled = false
				})
				.catch(e => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		},
		unSubscribe() {
			this.disabled = true
			let url = config.BASE_URL + `/subscribe/` + this.profile._id
			this.$store.dispatch('subscribes/unSubscribe', url)
				.then((data) => {
					let idx = this.$store.getters['auth/currentUser']
						.subscribes.findIndex((id) => id.toString() === data.uId.toString())
					this.$store.commit('auth/unSubscribe', idx)
					this.disabled = false
				})
				.catch(e => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		},
	},
	computed: {
		isLoading() {
			return this.$store.getters['profiles/isLoading']
		},
		currentUser() {
			return this.$store.getters['auth/currentUser']
		},
		isSubscribed() {
			return this.currentUser.subscribes.includes(this.profile._id)
		}
	},
	mounted() {
		let url = config.BASE_URL + `/profiles/` + this.$route.params.uId
		this.$store.dispatch('profiles/getProfileById', url)
			.then((data) => {
				this.profile = data.user 
			})
			.catch(e => {
				if(e.errors[0] === config.ERROR_MESSAGE) {
					storage.removeItem('accessToken')
					this.$router.push({name: 'login'})
				}
			})
	},
	activated() {
		let url = config.BASE_URL + `/profiles/` + this.$route.params.uId
		this.$store.dispatch('profiles/getProfileById', url)
			.then((data) => {
				this.profile = data.user 
			})
			.catch(e => {
				if(e.errors[0] === config.ERROR_MESSAGE) {
					storage.removeItem('accessToken')
					this.$router.push({name: 'login'})
				}
			})
	}
}
</script>