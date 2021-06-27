<template>
	<div>
		<div class="col-md-8 mx-auto mt-3">
			<form @submit.prevent="onSubmit" class="bg-light px-4 py-4 rounded">
				<div class="form-inner">
					<div class="mb-5">
						<label for="date" class="form-label">Введите дату</label>
						<input v-model="date" type="text" class="form-control" id="date" placeholder="yy:mm:dd - 2021:04:30">
					</div>			
					<div class="d-flex justify-content-between">
						<button type="submit" class="btn btn-primary">Submit</button>
					</div>
				</div>
			</form>
		</div>
		<h2 class="my-4 text-light d-flex justify-content-center" >Список дней</h2>
		<div class="col-md-8 mx-auto mt-5">
			<div class="days-wrapper">
				<div class="row d-flex justify-content-center mx-auto mb-5">
					<template v-if="oneDay">
						<day-block
							:day="oneDay"
						></day-block>
						<div class="d-flex justify-content-center">
							<button @click="resetOneDay" type="submit" class="btn btn-primary">Сбросить</button>
						</div>
					</template>
					<template v-else>
						<day-block
							v-for="(day, idx) in days" :key="idx" :day="day"
						></day-block>
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
import DayBlock from '@/components/DayBlock'
import config from '@/config/index'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			limit: config.LIMIT,
			offset: 0,
			isSending: false,
			days: [],
			isDays: true,
			oneDay: null,
			date: ''
		}
	},
	computed: {
		isLoading() {
			return this.$store.getters['days/isLoading']
		}
	},
	methods: {
		onScroll(evt) {
			const allHeight = document.documentElement.scrollHeight
			const currentHeight = document.documentElement.clientHeight + document.documentElement.scrollTop
			if(allHeight - currentHeight === 0 && this.isSending === false && this.isDays === true && this.oneDay === null) {
				this.isSending = true
				this.$store.dispatch('days/getDays', {limit: this.limit, offset: this.offset})
					.then((data) => {
						this.days = [...this.days, ...data.days]
						this.isSending = false
						this.offset += config.OFFSET
						this.isDays = data.days.length > 0 ? true : false
					})
					.catch((e) => {
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
				this.$store.dispatch('days/getDays', {date: this.date})
					.then((data) => {
						this.oneDay = data.day
						this.isSending = false
					})
					.catch((e) => {
						if(e.errors[0] === config.ERROR_MESSAGE) {
							storage.removeItem('accessToken')
							this.$router.push({name: 'login'})
						}
					})
			}
		},
		resetOneDay(evt) {
			this.date = ''
			this.oneDay = null
		}
	},
	mounted() {
		if(this.isDays) {
			this.isSending = true
			this.$store.dispatch('days/getDays', {limit: this.limit, offset: this.offset})
				.then((data) => {
					this.days = [...this.days, ...data.days]
					this.isSending = false
					this.offset += config.OFFSET
				})
				.catch((e) => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		}
		document.addEventListener('scroll', this.onScroll)
	},
	components: {
		DayBlock,
	}
}
</script>