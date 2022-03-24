import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		comments: body.comments,
		user_writing_id: body.user_writing_id
	})
}