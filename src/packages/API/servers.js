import axios from 'axios'

export default {
	GET_SERVERS(){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/servers',
		})
	},
	GET_SERVERS_DETAILS(){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/servers/detail',
		})
	},
	GET_SERVER(SERVER_ID){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/servers/' + SERVER_ID,
		})
	},
	DELETE_SERVER(SERVER_ID){
		return axios({
			method: 'DELETE',
			url: 'compute/v2.1/servers/' + SERVER_ID,
		})
	}
}
