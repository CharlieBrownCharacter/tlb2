import axios from 'axios'

export default {
	GET_NETWORKS(){
		return axios({
			method: 'GET',
			url: 'http://localhost:9696/v2.0/networks',
		})
	},
	DELETE_NETWORK(NETWORK_ID){
		return axios({
			method: 'DELETE',
			url: 'http://localhost:9696/v2.0/networks/' + NETWORK_ID,
		})
	},
	POST_NETWORK(data){		
		return axios({
			method: 'POST',
			url: 'http://localhost:9696/v2.0/networks',
			data: data
		})
	},
	GET_SUBNETS(SUBNET_ID){
		return axios({
			method: 'GET',
			url: 'http://localhost:9696/v2.0/subnetpools',
		})
	},
}
