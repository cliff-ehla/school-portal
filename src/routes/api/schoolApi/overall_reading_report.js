import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		start_date: body.start_date,
		end_date: body.end_date,
		organization_id: body.organization_id,
	})
}