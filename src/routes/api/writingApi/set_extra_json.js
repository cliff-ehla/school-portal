import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		user_writing_id: body.user_writing_id,
		extra_json: body.extra_json
	})
}