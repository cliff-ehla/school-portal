import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		tutor_group_id: body.tutor_group_id
	})
}