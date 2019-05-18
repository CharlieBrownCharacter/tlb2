import axios from 'axios'

export default {
	GET_FLAVOR(FLAVOUR_ID){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/flavors/' + FLAVOUR_ID,
		})
	},
	GET_FLAVORS(){
		return axios({
			method: 'GET',
			url: 'compute/v2.1/flavors',
		})
	},
	DELETE_FLAVOR(FLAVOR_ID){
		return axios({
			method: 'DELETE',
			url: 'compute/v2.1/flavors/' + FLAVOR_ID,
		})
	},
	POST_FLAVOR(data){
		return axios({
			method: 'POST',
			url: 'compute/v2.1/flavors',
			data: {
				flavor: data
			}
		})
	}
}
