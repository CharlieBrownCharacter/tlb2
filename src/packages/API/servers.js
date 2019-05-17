import axios from 'axios'

export default {
	GET_SERVERS(){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/servers',
		})
	}
}
