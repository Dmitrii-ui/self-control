<template>
	<div>
		<h2 class="my-4 text-light d-flex justify-content-center">Авторизация</h2>	
		<router-link class="my-4 text-light d-flex justify-content-center" :to="{name: 'register'}">
			Регистрация	
		</router-link>
		<div class="register-wrapper">
			<form @submit.prevent="onSubmit" class="bg-light px-4 py-4 rounded col-9 mx-auto">
				<validation-errors v-if="validationErrors" :validation-errors="validationErrors"></validation-errors>
				<div class="form-inner">
					<div class="mb-3">
						<label for="login-name" class="form-label">Ваше имя</label>
						<input v-model="name" type="text" class="form-control" id="login-name">
					</div>
					<div class="mb-3 w-100">
						<label for="login-password" class="form-label">Пароль:</label>
						<input v-model="password" type="password" id="login-password" class="form-control" placeholder="">
					</div>
					<div class="d-flex justify-content-between">
						<button :disabled="isSubmitting" type="submit" class="btn btn-primary">Войти</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors'
import {mapGetters} from 'vuex'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			name: '',
			password: ''
		}
	},
	methods: {
		onSubmit() {
			this.$store.dispatch('auth/login', {name: this.name, password: this.password})
				.then((user) => {
					this.$router.push({name: 'home'})
				})
		}
	},
	computed: {
		...mapGetters('auth', ['isSubmitting', 'validationErrors'])
	},
	activated() {
		this.password = ''
		this.name = ''
		storage.removeItem('accessToken')
		this.$store.commit('auth/reset')
	},
	components: {
		ValidationErrors
	}
}
</script>