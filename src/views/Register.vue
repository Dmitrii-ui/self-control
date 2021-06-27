<template>
	<div>
		<h2 class="my-4 text-light d-flex justify-content-center">Регистрация</h2>
		<router-link class="my-4 text-light d-flex justify-content-center" :to="{name: 'login'}">
			Авторизация	
		</router-link>	
		<div class="register-wrapper">
			<form @submit.prevent="onSubmit" class="bg-light px-4 py-4 rounded col-9 mx-auto">
				<validation-errors v-if="validationErrors" :validation-errors="validationErrors"></validation-errors>
				<div class="form-inner">
					<div class="mb-3">
						<label for="register-name" class="form-label">Ваше имя</label>
						<input v-model="name" type="text" class="form-control" id="register-name">
					</div>
					<div class="mb-3 w-100">
						<label for="register-password" class="form-label">Пароль:</label>
						<input v-model="password" type="password" id="register-password" class="form-control" placeholder="">
					</div>
					<div class="d-flex justify-content-between">
						<button :disabled="isSubmitting" type="submit" class="btn btn-primary">Зарегистрироваться</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import validationErrors from '@/components/ValidationErrors'

export default {
	data() {
		return {
			name: '',
			password: '',
		}
	},
	methods: {
		onSubmit() {
			this.$store.dispatch('auth/register', {name: this.name, password: this.password})
				.then((data) => {
					this.$router.push({name: 'login'})
				})
				.catch((err) => {
					
				})
		}
	},
	computed: {
		...mapGetters('auth', ['isSubmitting', 'validationErrors'])
	},
	activated() {
		this.$store.commit('auth/resetErrors')
	},
	components: {
		validationErrors
	}
}
</script>