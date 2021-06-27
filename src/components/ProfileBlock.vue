<template>
	<div class="col-lg-4 ms-3 col-md-5 col-sm-5 px-2 py-2 day-item bg-light rounded mb-3">
		<h5 class="profile-title">{{profile.name}}</h5>
		<img class="profile-img" :src="'https://nameless-refuge-99512.herokuapp.com/' + profile.avatar" alt="">
		<p>Коэффициент <b>{{profile.estimatedSuccessTasks}}%</b></p>
		<p>Секунды <b>{{profile.estimatedSuccessTime}}с</b></p>
		<router-link 
			:to="{name: 'userProfile', params: {uId: profile._id}}" 
			class="btn btn-success"
		>перейти</router-link>
	</div>
</template>

<script>

export default {
	props: {
		profile: {
			type: Object,
			required: true
		}
	}
}
</script>