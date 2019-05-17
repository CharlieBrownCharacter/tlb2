import Vue from 'vue'
import Vuex from 'vuex'
import AuthAPI from "./packages/API/auth"
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		user: null,
		token: ''
	},
	getters: {
		GET_USER: state => {
			return state.user
		},
		GET_TOKEN: state => {
			return state.token
		}
	},
	mutations: {
		SET_USER: (state, payload) =>  {
			state.user = payload
		},
		SET_TOKEN: (state, token) => {
			axios.defaults.headers['X-Auth-Token'] = token;
			state.token = token
		}
	},
	actions: {
		LOGIN_USER({ dispatch, commit }){
			return new Promise((resolve, reject) => {
				AuthAPI.letmein().then(r => {
					console.log(r)
					commit('SET_USER', r.data)
				});
			})
		}
	}
})
