import {createStore} from 'vuex'

import auth from '@/store/modules/auth'
import home from '@/store/modules/home'
import days from '@/store/modules/days'
import profiles from '@/store/modules/profiles'
import subscribes from '@/store/modules/subscribes'
import settings from '@/store/modules/settings'

const store = createStore({
	modules: {
		auth: auth,
		home: home,
		days: days,
		profiles: profiles,
		subscribes: subscribes,
		settings: settings,
	},
	state() {}
})

export default store