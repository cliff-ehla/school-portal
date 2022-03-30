import {writable, derived} from "svelte/store";
import {http} from "$lib/http.js";

const create_org_data = () => {
	const store = writable({})
	const d_store = derived(store, $store => {
		console.log($store)
		return {
			class_list: $store.classes,
			organization_id: $store.organization && $store.organization.id
		}
	})
	const setData = (org_data) => {
		store.set(org_data)
	}
	const fetchData = async (fetch) => {
		const {data, success, debug} = await http.get(fetch, '/organizationApi/user_organization_data_v2')
		if (!success) return {data, success, debug}
		store.set(data[0])
	}
	return {
		subscribe: d_store.subscribe,
		setData,
		fetchData
	}
}

export const org_data = create_org_data()