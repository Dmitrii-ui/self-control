<template>
	<div class="col-lg-4 ms-3 col-md-6 col-sm-8 px-2 py-2 day-item bg-light rounded mb-4">
		<h5 class="day-title">{{day.date}}</h5>
		<p>Выполнено {{day.successTasks}} из {{day.totalTasks}}</p>
		<router-link :to="{name: 'day', params: {id: day._id}}" class="btn btn-success">перейти</router-link>
	</div>
</template>

<script>

export default {
	props: {
		day: {
			type: Object,
			required: true
		}
	}
}
</script>