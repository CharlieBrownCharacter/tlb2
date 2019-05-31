import axios from 'axios'

export default {
	GET_NETWORKS(){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/os-networks',
		})
	}
}
