import {variables} from "$lib/env";
const base = variables.api_base + '/v1'
const is_dev = variables.env === 'dev'
const is_production_url = variables.api_base === 'https://usermodel.ehlacademy.org'

export async function usermodel (event, data) {
	const request = event.request
	const resource = request.url.split('/api')[1]
	const access_token = event.locals.access_token
	if (request.method === 'POST' && data) {
		data = { params: data }
	}
	const query = {
		'encode': 1,
		'access-token': access_token
	}
	let url = `${base}${resource}`
	for (const property in query) {
		if (query[property]) {
			let char = url.includes('?') ? '&' : '?'
			url += `${char}${property}=${query[property]}`
		}
	}
	const res = await fetch(url, {
		method: request.method,
		headers: {
			'Authorization': 'Basic ZWhsX2FwaToyNzE1MDkwMA==',
			'Content-Type': 'application/json'
		},
		body: data && JSON.stringify(data)
	})

	return {
		status: res.status,
		body: await res.json()
	}
}