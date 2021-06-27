<template>
	<div>
		<div class="col-md-8 mx-auto">
			<form @submit.prevent="onSubmit" class="bg-light px-4 py-4 rounded">
				<div class="form-inner">
					<div class="mb-3">
						<label for="name" class="form-label">Введите имя профиля</label>
						<input type="text" class="form-control" id="name" v-model="name">
					</div>			
					<div class="d-flex justify-content-between">
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		</div>
		<h2 class="my-4 text-light d-flex justify-content-center">Профили</h2>
		<div class="col-md-10 mx-auto mt-5">
			<div class="days-wrapper">
				<div class="row d-flex justify-content-center mx-auto">
					<template v-if="oneProfile">
						<profile-block
							:profile="oneProfile"
						></profile-block>
						<div class="d-flex justify-content-center">
							<button @click="resetOneProfile" type="submit" class="btn btn-primary">Сбросить</button>
						</div>
					</template>
					<template v-else>
						<profile-block
							v-for="(profile, idx) in profiles"
							:key="idx"
							:profile="profile"
						></profile-block>
					</template>
					<div v-if="isLoading" class="d-flex justify-content-center">
						<div class="spinner-border" role="status">
							<span class="visually-hidden">Загрузка...</span>
						</div>
					</div>
				</div>
		</div>
		</div>
	</div>
</template>

<script>
import ProfileBlock from '@/components/ProfileBlock'
import config from '@/config/index'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			limit: config.LIMIT,
			offset: 0,
			isSending: false,
			profiles: [],
			isProfiles: true,
			oneProfile: null,
			name: ''
		}
	},
	computed: {
		isLoading() {
			return this.$store.getters['profiles/isLoading']
		}
	},
	methods: {
		onScroll(evt) {
			const allHeight = document.documentElement.scrollHeight
			const currentHeight = document.documentElement.clientHeight + document.documentElement.scrollTop
			if(allHeight - currentHeight === 0 && this.isSending === false && this.isProfiles === true && this.oneProfile === null) {
				this.isSending = true
				this.$store.dispatch('profiles/getProfiles', {limit: this.limit, offset: this.offset})
					.then((data) => {
						this.profiles = [...this.profiles, ...data.users]
						this.isSending = false
						this.offset += config.OFFSET
						this.isProfiles = data.users.length > 0 ? true : false
					})
					.catch(e => {
						if(e.errors[0] === config.ERROR_MESSAGE) {
							storage.removeItem('accessToken')
							this.$router.push({name: 'login'})
						}
					})
				
			}
		},
		onSubmit(evt) {
			if(this.isSending === false) {
				this.isSending = true
				this.$store.dispatch('profiles/getProfiles', {name: this.name})
					.then((data) => {
						this.oneProfile = data.user
						this.isSending = false
					})
					.catch(e => {
						if(e.errors[0] === config.ERROR_MESSAGE) {
							storage.removeItem('accessToken')
							this.$router.push({name: 'login'})
						}
					})
			}
		},
		resetOneProfile(evt) {
			this.name = ''
			this.oneProfile = null
		}
	},
	mounted() {
		if(this.isProfiles) {
			this.isSending = true
			this.$store.dispatch('profiles/getProfiles', {limit: this.limit, offset: this.offset})
				.then((data) => {
					this.profiles = [...this.profiles, ...data.users]
					this.isSending = false
					this.offset += config.OFFSET
				})
				.catch(e => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		}
		document.addEventListener('scroll', this.onScroll)
	},
	components: {
		ProfileBlock,
	}
}
</script>