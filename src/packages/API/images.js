import axios from 'axios'

export default {
	GET_IMAGES(){
		return axios({
			method: 'GET',
			url: 'http://localhost:8080/image/v2/images',
		})
	},
	GET_IMAGE(IMAGE_ID){
		return axios({
			method: 'GET',
			url: 'http://localhost:8080/image/v2/images/' + IMAGE_ID,
		})
	},
	DELETE_IMAGE(IMAGE_ID){
		return axios({
			method: 'DELETE',
			url: 'http://localhost:8080/image/v2/images/' + IMAGE_ID,
		})
	},
	POST_IMAGE(data){
		return axios({
			method: 'POST',
			url: 'http://localhost:8080/image/v2/images',
			data: data
		})
	},
	PUT_IMAGE(IMAGE_ID, FILE){
		return axios({
			method: 'PUT',
			url: 'http://localhost:8080/image/v2/images/' + IMAGE_ID + '/file',
			headers: {
				'Content-Type': 'application/octet-stream'
			},
			data : FILE
		})
	}	
}

