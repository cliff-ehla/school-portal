import {writable, derived, get} from "svelte/store";
import {http} from "$lib/http.js";

const create_org_data = () => {
	const store = writable({})
	const d_store = derived(store, $store => {
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
	const getTutorGroupIdByClassId = (class_id) => {
		const _class_list = get(d_store).class_list
		const _class = _class_list ? _class_list.find(c => c.c_id === class_id) : null
		const first_tg = _class ? _class.tutor_groups[0] : null
		return first_tg ? first_tg.tutor_group_id : null
	}
	return {
		subscribe: d_store.subscribe,
		setData,
		fetchData,
		getTutorGroupIdByClassId
	}
}

export const org_data = create_org_data()