<template>
	<div class="mt-2 bg-light rounded px-2 py-2">
		<router-link class="text-decoration-none" :to="{name: 'userProfile', params: {uId: subscribe._id}}">
			<p class="fs-5">
				<b>
					{{subscribe.name}} 
					<img :src="'https://nameless-refuge-99512.herokuapp.com/' + subscribe.avatar" alt="" class="profile-img subscribe">
				</b>
			</p>
		</router-link>
	</div>
</template>

<script>

export default {
	props: {
		subscribe: {
			type: Object,
			required: true
		}
	}
}
</script>