import axios from 'axios'

export default {
	GET_VOLUMES(PROJECT_ID){
		return axios({
			method: 'GET',
			url: 'volume/v3/' + PROJECT_ID + '/volumes/detail',
		})
	},
	DELETE_VOLUME(PROJECT_ID, VOLUME_ID){
		return axios({
			method: 'DELETE',
			url: 'volume/v3/' + PROJECT_ID + '/volumes/' + VOLUME_ID,
		})
	},
	POST_VOLUME(PROJECT_ID, data){		
		return axios({
			method: 'POST',
			url: 'volume/v3/' + PROJECT_ID + '/volumes',
			data: data
		})
	},
}
