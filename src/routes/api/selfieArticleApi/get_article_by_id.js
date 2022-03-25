import {usermodel} from "$lib/usermodal";

export const post = async (event) => {
	const body = await event.request.json()
	return usermodel(event, {
		article_id: body.article_id
	})
}