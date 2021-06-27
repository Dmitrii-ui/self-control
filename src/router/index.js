import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store/index'
import storage from '@/helpers/localStorage'

import Register from '@/views/Register'
import Login from '@/views/Login'
import Home from '@/views/Home'
import notFound from '@/views/NotFound'
import Days from '@/views/Days'
import OneDay from '@/views/OneDay'
import Profiles from '@/views/Profiles'
import OneProfile from '@/views/OneProfile'
import Subscribes from '@/views/Subscribes'
import Settings from '@/views/Settings'
import About from '@/views/About'

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{path: '/', name: 'home', component: Home, meta: {isAuth: true}},
		{path: '/register', name: 'register', component: Register, meta: {isAuth: false}},
		{path: '/login', name: 'login', component: Login, meta: {isAuth: false}},
		{path: '/about', name: 'about', component: About, meta: {isAuth: false}},
		{path: '/settings', name: 'settings', component: Settings, meta: {isAuth: true}},
		{path: '/day/:id', name: 'day', component: OneDay, meta: {isAuth: true}},
		{path: '/days', name: 'days', component: Days, meta: {isAuth: true}},
		{path: '/profiles', name: 'profiles', component: Profiles, meta: {isAuth: true}},
		{path: '/profiles/:uId', name: 'userProfile', component: OneProfile, meta: {isAuth: true}},
		{path: '/subscribes', name: 'subscribes', component: Subscribes, meta: {isAuth: true}},
		{path: '/:notFound(.*)', component: notFound},
	]
})


router.beforeEach((to, from, next) => {
	let isAuth = to.matched.some((route) => route.meta.isAuth === true)
	let isLoggedIn = localStorage.getItem('accessToken')
	if(isAuth && !isLoggedIn) {
		next({name: 'login'})
	} else {
		next(true)
	}
})


export default router