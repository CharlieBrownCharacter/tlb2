import axios from 'axios'
import {store} from '../../store'

export default {
	GET_GOALS(){
		return axios({
			method: 'GET',
			url: 'http://localhost:9322/v1/goals',
			headers: {
				"X-Auth-Token": "OEQWOEQWK"
			}
		})
	}
}
