<template>
	<div>
		<div v-if="isLoading" class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Загрузка...</span>
			</div>
		</div>
		<template v-else>
			<template v-if="day">
				<h2 class="my-4 text-light d-flex justify-content-center">День {{day.date}}</h2>	
				<div class="col-md-8 mx-auto">
					<div class="tasks-wrapper py-4 px-4 bg-light rounded">
						<p v-for="task in donedTasks" :key="task" class="fs-4 text-success">{{task.name}}	&#10004;</p>
						<p v-for="task in failureTasks" :key="task" class="fs-4 text-danger">{{task.name}} &times;</p>
					</div>
				</div>
			</template>
			<div v-else>
				<h2 class="my-4 text-light d-flex justify-content-center">День не найден</h2>	
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
			day: null
		}
	},
	computed: {
		isLoading() {
			return this.$store.getters['days/isLoading']
		},
		donedTasks() {
			return this.day.tasks.filter((task) => task.isDone === true)
		},
		failureTasks() {
			return this.day.tasks.filter((task) => task.isDone === false)
		},
	},
	mounted() {
		let url = config.BASE_URL + `/days/` + this.$route.params.id
		this.$store.dispatch('days/getDayById', url)
			.then((data) => {
				this.day = data.day 
			})
			.catch(e => {
				if(e.errors[0] === config.ERROR_MESSAGE) {
					storage.removeItem('accessToken')
					this.$router.push({name: 'login'})
				}
			})
	},
	activated() {
		let url = config.BASE_URL + `/days/` + this.$route.params.id
		this.$store.dispatch('days/getDayById', url)
			.then((data) => {
				this.day = data.day 
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