<template>
	<div class="col-md-8 mx-auto mb-5">
		<header class="header">
			<nav class="navbar navbar-expand-sm md-sm-3">
				<div class="row w-100">
					<div class="col-md-12 mx-auto">
						<div>
							<ul class="navbar-nav me-auto mb-2 mb-lg-0 w-100 justify-content-sm-between justify-content-md-start">
								<li class="nav-item me-md-3">
										<router-link 
										class="nav-link link-light fw-bolder fs-6 text" 
										:to="{name: 'about'}"
										exact
										active-class="active">
											О проекте
										</router-link>
									</li>
								<template v-if="isLoggedIn && currentUser">
									<li class="nav-item me-md-3">
										<router-link 
										class="nav-link link-light fw-bolder fs-6 text" 
										:to="{name: 'home'}"
										exact
										active-class="active">
											Главная
										</router-link>
									</li>
									<li class="nav-item me-md-3">
										<router-link 
											class="nav-link link-light fw-bolder fs-6 text" 
											active-class="active"
											:to="{name: 'settings'}">
											<img class="avatar-img" :src="'https://nameless-refuge-99512.herokuapp.com/'+currentUser.avatar" alt="">
											Профиль
										</router-link>
									</li>
									<li class="nav-item me-md-3">
										<router-link 
											class="nav-link link-light fw-bolder fs-6 text" 
											active-class="active"
											:to="{name: 'profiles'}">
											Профили
										</router-link>
									</li>
									<li class="nav-item me-md-3">
										<router-link 
											class="nav-link link-light fw-bolder fs-6 text" 
											active-class="active"
											:to="{name: 'subscribes'}">
											Подписки
										</router-link>
									</li>
									<li class="nav-item me-md-3">
										<router-link 
											class="nav-link link-light fw-bolder fs-6 text" 
											active-class="active"
											:to="{name: 'days'}">
											Дни
										</router-link>
									</li>
									<li class="nav-item me-md-3">
										<router-link 
											class="nav-link link-light fw-bolder fs-6 text" 
											active-class="active"
											:to="{name: 'login'}">
											Выйти
										</router-link>
									</li>
								</template>
								<template v-else>
									<li class="nav-item me-md-3">
										<router-link class="nav-link link-light fw-bolder fs-6 text" active-class="active" :to="{name: 'login'}">
											Войти
										</router-link>
									</li>
								</template>
							</ul>
						</div>
					</div>
				</div>
			</nav>
		</header>
	</div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
	computed: {
		...mapGetters('auth', ['isLoggedIn', 'currentUser'])
	}
}
</script>

<style lang="sass">

</style>
