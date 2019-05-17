import axios from 'axios'

export default {
	letmein(){
		return axios({
			method: 'POST',
			url: 'identity/v3/auth/tokens',
			data: {
				"auth": {
					"identity": {
						"methods": [
							"password"
						],
						"password": {
							"user": {
								"name": "admin",
								"domain": {
									"name": "Default"
								},
								"password": "devstack"
							}
						}
					}
				}
			}
		})
	}
}
