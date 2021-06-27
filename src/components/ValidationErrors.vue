<template>
	<div class="mb-3">
		<ul class="list-group">
			<li class="list-group-item text-danger" v-for="error in validationErrors" :key="error">
				{{error}}
			</li>
		</ul>
	</div>
</template>

<script>

export default {
	props: {
		validationErrors: {
			type: Array,
			required: true
		}
	}
}
</script>