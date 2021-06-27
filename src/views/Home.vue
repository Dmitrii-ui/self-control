<template>
	<div>
			<div class="col-lg-12 col-xl-8 mx-auto">
				<form @submit.prevent="onSubmit" class="bg-light px-4 py-4 rounded">
					<div v-if="isShow" @click="setChoice" class="form-action mb-3 d-flex justify-content-center flex-wrap">
						<h3 class="text-center mb-3 w-100">Выберите вид задачи</h3>
						<button class="btn btn-secondary me-2">Полезное</button>
						<button class="btn btn-secondary">Отрицательное</button>
					</div>
					<div class="form-inner">
						<div class="mb-3">
							<label for="name" class="form-label">Название задачи</label>
							<input type="text" id="name" class="form-control" v-model="name">
						</div>
						<div class="mb-3 w-100" v-if="getMode">
							<label for="time" class="form-label">Максимальное время, которое можно уделить времени на вредное действие:</label>
							<input 
								id="time"
								@input="onInput" 
								type="text" 
								v-model="maxTime" 
								class="form-control" 
								placeholder="h:m:s - 01:30:00"
								@blur="isTouched = true">
								<p class="text-danger" v-if="isTouched && isInputError"><small>Неправильно заполнено поле</small></p>
						</div>
						<div class="d-flex justify-content-between">
							<button type="submit" class="btn btn-primary">Submit</button>
						</div>
					</div>
				</form>
			</div>
			<template v-if="!isLoading">
				<h2 v-if="getDay" class="my-4 text-light d-flex justify-content-center">День закончился. Работать больше нельзя</h2>
				<h2 class="my-4 text-light d-flex justify-content-center">Отслеживание работы</h2>
				<template v-if="day">
					<div class="col-sm-8 mx-auto mt-5">
						<div class="progress">
							<div 
								class="progress-line"
								:style="{width: getPercentile(day.successTasks, day.totalTasks) + '%'}">
								<p class="progress-text">
									Выполнено {{day.successTasks}} из {{day.totalTasks}}
								</p>
							</div>
						</div>
					</div>	
					<div class="col-sm-8 mx-auto mt-5">
						<div class="row time-wrapper py-2 px-2 justify-content-between">
							<div class="time-block col-md-5 mb-3 mb-md-0">
								<h3>Полезное время</h3>
								<p class="time-info text-success">{{toStringFormat(day.successTime)}}</p>
							</div>
							<div class="time-block col-md-5">
								<h3>Вредное время</h3>
								<p class="time-info text-danger">{{toStringFormat(day.failureTime)}}</p>
							</div>
						</div>
					</div>
				</template>
				<h5 v-else class="my-4 text-light d-flex justify-content-center">Данных пока нет</h5>
				<h2 class="my-4 text-light d-flex justify-content-center">Список сделанных задач</h2>
				<div class="col-md-10 mx-auto mt-5">
					<div class="tasks-wrapper">
						<div class="tasks-harm">
							<div class="row d-flex justify-content-center" v-if="getDonedTasks.length > 0">
								<div class="task-item py-2 px-3 mb-4 col-lg-5 col-8 me-5" v-for="donedTask in getDonedTasks" :key="donedTask">
									<h5 class="task-name text-success text-decoration-line-through">{{donedTask.name}}</h5>
								</div>
							</div>
							<h5 v-else class="my-4 text-light d-flex justify-content-center">Нет задач</h5>
						</div>
					</div>
				</div>
				<h2 class="my-4 text-light d-flex justify-content-center">Список полезных задач</h2>
				<div class="col-md-10 mx-auto mt-5">
					<div class="tasks-wrapper">
						<div class="tasks-harm">
							<div class="row d-flex justify-content-center" v-if="getPositiveTasks.length > 0">
								<positive-task 
									v-for="positiveTask in getPositiveTasks" 
									:key="positiveTask"
									:task="positiveTask"
									:isEnd="isDisabled"
									@start-task="startTask"
									@complete-task="completeTask"
									@stop-task="stopTask"
									:isStarted="isStarted"
								></positive-task>
							</div>
							<h5 v-else class="my-4 text-light d-flex justify-content-center">Нет задач</h5>
						</div>
					</div>
				</div>
				<h2 class="my-4 text-light d-flex justify-content-center">Список вредных задач</h2>
				<div class="col-md-10 mx-auto mt-5">
					<div class="tasks-wrapper">
						<div class="tasks-harm">
							<div class="row" v-if="getNegativeTasks.length > 0">
								<negative-task
									v-for="negativeTask in getNegativeTasks"
									:key="negativeTask"
									:task="negativeTask"
									:isStarted="isStarted"
									:isEnd="isDisabled"
									@start-task="startTask"
									@stop-task="stopTask"
								></negative-task>
							</div>
							<h5 v-else class="my-4 text-light d-flex justify-content-center">Нет задач</h5>
						</div>
					</div>
				</div>
			</template>
			<div v-else class="d-flex justify-content-center mt-5">
				<div class="spinner-border" role="status">
					<span class="visually-hidden">Загрузка...</span>
				</div>
			</div>
	</div>
</template>

<script>
import checkFormat from '@/helpers/checkFormat'
import toNumberFormat from '@/helpers/toNumberFormat'
import toStringFormat from '@/helpers/toStringFormat'
import getSeconds from '@/helpers/getSeconds'
import PositiveTask from '@/components/PositiveTask.vue'
import NegativeTask from '@/components/NegativeTask.vue'
import config from '@/config/index'
import getPercentile from '@/helpers/getPercentile'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			name: '',
			mode: '',
			maxTime: '',
			isTouched: false,
			tasks: [],
			day: null,
			isStarted: false,
			interval: null,
			timeInterval: null,
			taskId: null,
			isEnd: false,
			windowListener: null
		}
	},
	methods: {
		setChoice(evt) {
			if(evt.target.textContent === 'Полезное') {
				this.mode = 'positive'
			} else if(evt.target.textContent === 'Отрицательное') {
				this.mode = 'negative'
			}
		},
		onSubmit() {
			if(this.getDay) {
				alert('День уже закончился. Приступите к работе завтра')
				return 
			}

			if(this.mode === '') {
				alert('Выберите разновидность задачи')
				return
			}
			
			if(this.name.length < 4 || this.name.length > 24) {
				alert('Имя не должно быть меньше 4 символов или больше 24 символов')
				return
			} 

			if(this.isInputError) {
				this.isTouched = true
				alert('Время должно быть заполнено по образцу(hh:mm:ss - 01:30:00)')
				return
			} 

			let taskData = {name: this.name, mode: this.mode}
			
			if(this.mode === 'negative') {
				taskData.maxTime = toNumberFormat(this.maxTime)
			}
			
			this.$store.dispatch('home/setTask', taskData)
				.then((data) => {
					this.mode = ''
					this.name = ''
					this.maxTime = ''
					this.isTouched = false
					if(data.day) {
						this.tasks = [...data.day.tasks]
						this.day = data.day
					} else {
						this.tasks.push(data.tasks[data.tasks.length - 1])
						this.day.totalTasks++
					}
				})
				.catch((e) => {
					if(e.errors && e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					} else {
						alert('Уже поздно, начните завтра')
					}
				})
			
		},
		toStringFormat(num) {
			return toStringFormat(num)
		},
		getPercentile(current, max) {
			return getPercentile(current, max)
		},
		completeTask(task) {
			this.stopTask(task)
			task.isDone = true
			this.$store.dispatch('home/completeTask', task)
				.then((data) => {
					this.day.successTasks++
				})
				.catch(e => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		},
		startTask(task) {
			this.taskId = task._id
			this.isStarted = true 
			this.interval = setInterval(() => {
				task.makeTime = task.makeTime + config.SECOND
				this.day.totalTime = this.day.totalTime + config.SECOND
				if(task.mode === 'positive') {
					this.day.successTime = this.day.successTime + config.SECOND
				} else {
					this.day.failureTime = this.day.failureTime + config.SECOND
				}
			}, 1000)
		},
		stopTask(task) {
			if(task._id === this.taskId) { 
				this.isStarted = false 
				this.taskId = null
				clearInterval(this.interval)
			} else {
				return
			}
		},
	},
	computed: {
		getMode() {
			return this.mode === 'negative'
		},
		isShow() {
			return this.mode === ''
		},
		isInputInvalid() {
			return !checkFormat(this.maxTime)
		},
		isInputError() {
			return this.isInputInvalid && this.mode === 'negative'
		},
		isLoading() {
			return this.$store.getters['home/isLoading']
		},
		getData() {
			return this.$store.getters['home/data']
		},
		getPositiveTasks() {
			return this.tasks.filter((task) => task.mode === 'positive' && task.isDone === false)
		},
		getNegativeTasks() {
				return this.tasks.filter((task) => task.mode === 'negative' && task.isDone === false)
		},
		getDonedTasks() {
			return this.tasks.filter((task) => task.isDone === true)
		},
		getDay() {
			return this.day && this.day.isEnd
		},
		isDisabled() {
			return this.getDay || this.taskId !== null
		}
	},
	mounted() {
		this.$store.dispatch('home/getCurrentTasks')
			.then((data) => {
				this.tasks = [...data.day.tasks]
				this.day = {...data.day}
				delete this.day.tasks
			})
			.catch(e => {
				if(e.errors && e.errors[0] === config.ERROR_MESSAGE) {
					storage.removeItem('accessToken')
					this.$router.push({name: 'login'})
				}
			})

		this.windowListener = () => {
			this.$store.dispatch('home/updateAllTasks', {tasks: this.tasks})
				.catch(e => {
					if(e.errors[0] === config.ERROR_MESSAGE) {
						storage.removeItem('accessToken')
						this.$router.push({name: 'login'})
					}
				})
		}
		window.addEventListener('unload', this.windowListener) 

		this.timeInterval = setInterval(() => {
			let seconds = getSeconds()
			if(this.$store.getters['auth/currentUser'] && seconds > this.$store.getters['auth/currentUser'].dayEnd) {
				this.$store.dispatch('home/updateAllTasks', {tasks: this.tasks})
					.then((data) => {
						this.tasks = [...data.day.tasks]
						this.day = {...data.day}
						delete this.day.tasks
						this.isEnd = true
					})
					.catch((e) => {
						this.isEnd = true 

						if(e.errors && e.errors[0] === config.ERROR_MESSAGE) {
							storage.removeItem('accessToken')
							this.$router.push({name: 'login'})
						}
					})
				this.stopTask({_id: this.taskId})
				clearInterval(this.timeInterval)
			}
		}, 1000)
	},
	destroyed() {
		window.removeEventListener('unload', this.windowListener)
		clearInterval(this.timeInterval)
	},
	components: {
		PositiveTask,
		NegativeTask,
	},
}
</script>