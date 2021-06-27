<template>
	<div class="task-item py-2 px-3 mb-4 col-lg-5 col-8 me-5">
		<h5 class="task-name mb-4 text-break">{{task.name}}</h5>
		<div class="task-infoblock">
			<div class="task-buttons mb-2">
				<button :disabled="isStarted || isEnd" @click="startTask(task)" class="btn btn-primary me-2">Старт</button>
				<button @click="stopTask(task)" class="btn btn-danger me-2">Остановить</button>
				<button :disabled="isEnd" @click.prevent="completeTask(task)" class="btn btn-success">Завершить</button>
			</div>
			<p class="task-info mt-2 mb-0">
				Время: <b>{{toStringFormat(task.makeTime)}}</b>
			</p>
		</div>
	</div>
</template>

<script>
import toStringFormat from '@/helpers/toStringFormat'

export default {
	data() {
		return {
			
		}
	},
	props: {
		task: {
			type: Object,
			required: true
		},
		isStarted: {
			type: Boolean,
			required: true
		},
		isEnd: {
			type: Boolean,
			required: true
		}
	},
	emits: {
		'start-task'(task) {
			if(task) {
				return true
			} 
			console.warn('There\'s no task to do method \'start-task\'')
			return false
		},
		'complete-task'(task) {
			if(task) {
				return true
			} 
			console.warn('There\'s no task to do method \'start-task\'')
			return false
		},
		'stop-task'(task) {
			if(task) {
				return true
			} 
			console.warn('There\'s no task to do method \'start-task\'')
			return false
		},
	},
	methods: {
		completeTask(task) {
			this.$emit('complete-task', task)
		},
		startTask(task) {
			this.$emit('start-task', task)
		},
		stopTask(task) {
			this.$emit('stop-task', task)
		},
		toStringFormat(num) {
			return toStringFormat(num)
		}
	}
}
</script>