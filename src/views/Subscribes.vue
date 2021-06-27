<template>
	<div class="col-sm-6 mx-auto mt-4">
		<h2 class="my-4 text-dark d-flex justify-content-center">Подписки</h2>
		<div v-if="isLoading" class="d-flex justify-content-center">
			<div class="spinner-border" role="status">
				<span class="visually-hidden">Загрузка...</span>
			</div>
		</div>
		<template v-else>
			<template v-if="isContains">
				<subscribe-block
					v-for="(subscribe, idx) in subscribes"
					:key="idx"
					:subscribe="subscribe"
				></subscribe-block>
			</template>
			<h2 v-else class="my-4 text-light d-flex justify-content-center">Подписок пока нет...</h2>
		</template>
	</div>
</template>

<script>
import SubscribeBlock from '@/components/SubscribeBlock'
import config from '@/config/index'
import storage from '@/helpers/localStorage'

export default {
	data() {
		return {
			subscribes: []
		}
	},
	computed: {
		isLoading() {
			return this.$store.getters['subscribes/isLoading']
		},
		isContains() {
			return this.subscribes.length > 0
		}
	},
	mounted() {
		this.$store.dispatch('subscribes/getAll')
			.then((data) => {
				this.subscribes = data.subscribes
			})
			.catch(e => {
				if(e.errors[0] === config.ERROR_MESSAGE) {
					storage.removeItem('accessToken')
					this.$router.push({name: 'login'})
				}
			})
	},
	activated() {
		this.$store.dispatch('subscribes/getAll')
			.then((data) => {
				this.subscribes = data.subscribes
			})
			.catch(e => {
				if(e.errors[0] === config.ERROR_MESSAGE) {
					storage.removeItem('accessToken')
					this.$router.push({name: 'login'})
				}
			})
	},
	components: {
		SubscribeBlock
	}
}
</script>