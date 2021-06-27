<template>
	<div class="task-item py-3 px-3 mb-4">
		<h5 class="task-name mb-4 text-break">{{task.name}}</h5>
		<div class="task-infoblock">
			<div class="task-buttons mb-2">
				<button :disabled="isStarted || isEnd" @click="startTask(task)" class="btn btn-primary me-2">Старт</button>
				<button @click="stopTask(task)" class="btn btn-danger">Остановить</button>
			</div>
			<p class="task-info">
				<div class="progress">
					<div 
						class="progress-line" 
						:style="{width: getPercentile(task.makeTime, task.maxTime) + '%'}">
						<p class="progress-text">
							Время: {{toStringFormat(task.makeTime)}} из {{toStringFormat(task.maxTime)}}
						</p>
					</div>
				</div>
			</p>
		</div>
	</div>
</template>

<script>
import toStringFormat from '@/helpers/toStringFormat'
import getPercentile from '@/helpers/getPercentile'

export default {
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
		},
		getPercentile(current, max) {
			return getPercentile(current, max)
		},
	}
}
</script>