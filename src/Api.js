const getGarage = async (content) => {
	content = `https://bikepost.ru/my/${content}/garage/`
	return fetch(`https://localhost:9000/content?url=${decodeURI(content)}`)
}
const postGarageList = async (post) => {
	return postData(`https://localhost:9000/content`, post)
}
export { getGarage, postGarageList };

async function postData(url = '', data = {}) {
  // Значения по умолчанию обозначены знаком *
    	return fetch(url, {
	        method: 'POST', // *GET, POST, PUT, DELETE, etc.
	        mode: 'cors', // no-cors, cors, *same-origin
	        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
	        credentials: 'same-origin', // include, *same-origin, omit
	        headers: {
	            'Content-Type': 'application/json',
	            // 'Content-Type': 'application/x-www-form-urlencoded',
	        },
	        redirect: 'follow', // manual, *follow, error
	        referrer: 'no-referrer', // no-referrer, *client
	        body: JSON.stringify(data), // тип данных в body должен соответвовать значению заголовка "Content-Type"
	    })
    	.then(response => {
    		
   			try {
    			return response.json()
    		} catch (err) {
		    	console.log(err)
		    }
    	})
}