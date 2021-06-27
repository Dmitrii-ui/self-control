<template>
	<div v-if="currentUser">
		<div class="col-md-8 mx-auto mt-4">
			<h2 class="my-4 text-dark d-flex justify-content-center">Профиль {{currentUser.name}}</h2>
			<div class="img-wrapper d-flex justify-content-center mb-4">
				<img ref="img" :src="'https://nameless-refuge-99512.herokuapp.com/'+currentUser.avatar" alt="" class="profile-avatar">
			</div>
			<form @submit.prevent="onSubmit" class="bg-light px-4 py-4 rounded">
				<validation-errors v-if="validationErrors" :validation-errors="validationErrors"></validation-errors>
				<div class="form-inner">
					<div class="mb-3">
						<label for="name" class="form-label">Имя</label>
						<input type="text" class="form-control" id="name" v-model="name">
					</div>
					<div class="mb-3">
						<label for="avatar" class="form-label">Изменить аватар</label>
						<input ref="inputFile" @change="onChange" type="file" id="avatar" class="form-control">
					</div>
					<div class="mb-3">
						<label for="end" class="form-label">Окончание дня</label>
						<input type="text" v-model="dayEnd" id="end" class="form-control" placeholder="hh:mm:ss - 22:00:00">
					</div>
					<div class="mb-3 w-100">
						<label for="new-password" class="form-label">Изменить пароль:</label>
						<input v-model="newPassword" type="password" id="new-password" class="form-control" placeholder="h:m:s - 01:30:00">
					</div>
					<div class="mb-3 w-100">
						<label for="rpassword" class="form-label">Пароль сейчас:</label>
						<input v-model="password" type="password" id="password" class="form-control" placeholder="h:m:s - 01:30:00">
					</div>
					<div class="d-flex justify-content-between">
						<button type="submit" class="btn btn-primary">Отправить</button>
					</div>
				</div>
			</form>
		</div>
		<div class="col-md-8 mx-auto mt-4">
			<h2 class="my-4 text-dark d-flex justify-content-center">Статистика по дням</h2>
			<div class="mt-2 bg-light rounded px-2 py-2">
				<p class="fs-5">
					Средний коэффициент выполненных задач за три дня: <b>{{currentUser.estimatedSuccessTasks}}%</b>
				</p>
				<p class="fs-5">
					Средний коэффициент уделенного времени на задачи за три дня(в секундах): <b>{{currentUser.estimatedSuccessTime}}с</b>
				</p>
			</div>
		</div>
	</div>
	<div v-else class="d-flex justify-content-center">
		<div class="spinner-border" role="status">
			<span class="visually-hidden">Загрузка...</span>
		</div>
	</div>
</template>

<script>
import ValidationErrors from '@/components/ValidationErrors'
import config from '@/config/index'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			dayEnd: '',
			name: '',
			password: '',
			newPassword: '',
			avatar: ''
		}
	},
	methods: {
		onSubmit() {
			let user = {
				name: this.name,
				dayEnd: this.dayEnd,
				avatar: this.avatar,
				password: this.password,
				newPassword: this.newPassword
			}
			this.$store.dispatch('settings/updateSettings', user)
				.then((data) => {
					if(data.user.avatar) {
						this.$store.commit('auth/setAvatar', data.user.avatar)
					}
					this.newPassword = ''
					this.password = ''
					this.dayEnd = ''
					this.avatar = ''
					this.$refs.inputFile.value = ''
					this.$store.commit('auth/setName', this.name)
				})
				.catch(e => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		},
		onChange(evt) {
			let img = this.$refs.img
			let input = evt.target 
			let that = this
			if(input.files && input.files[0]) {
				const reader = new FileReader()
				reader.onload = function(file) {
					img.src = file.target.result
					that.avatar = input.files[0]
				}
				reader.readAsDataURL(input.files[0])
			}
		}
	},
	computed: {
		currentUser() {
			return this.$store.getters['auth/currentUser']
		},
		validationErrors() {
			return this.$store.getters['settings/errors']
		}
	},
	watch: {
		currentUser(user) {
			if(user) {
				this.name = user.name
			}
		}
	},
	activated() {
		if(this.currentUser) {
			this.name = this.currentUser.name
		}
	},
	components: {
		ValidationErrors
	}
}
</script>